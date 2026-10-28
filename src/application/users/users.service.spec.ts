import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../infrastructure/persistance/generated/prisma/enums';
import { PrismaService } from '../../infrastructure/persistance/prisma/prisma.service';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

describe('UsersService', () => {
  let service: UsersService;
  const prisma = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsersService(prisma as unknown as PrismaService);
  });

  it('creates a user with a hashed password', async () => {
    const data: CreateUserDto = {
      name: 'Ana Costa',
      email: 'ana@example.com',
      password: 'secret',
      role: UserRole.BROKER,
      creci: null,
    };
    const expected = { id: 'user-1', name: data.name, email: data.email };
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue(expected);

    await expect(service.create(data)).resolves.toEqual(expected);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: data.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        creci: data.creci,
        passwordHash: 'hashed-password',
      },
    });
  });

  it('rejects creating a user with an existing email', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-existing' });

    await expect(
      service.create({
        name: 'Ana Costa',
        email: 'ana@example.com',
        password: 'secret',
        role: UserRole.BROKER,
        creci: null,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('returns all users', async () => {
    const expected = [{ id: 'user-1' }];
    prisma.user.findMany.mockResolvedValue(expected);

    await expect(service.findAll()).resolves.toEqual(expected);
    expect(prisma.user.findMany).toHaveBeenCalledWith();
  });

  it('returns one user by id', async () => {
    const expected = { id: 'user-1' };
    prisma.user.findUnique.mockResolvedValue(expected);

    await expect(service.findOne('user-1')).resolves.toEqual(expected);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
    });
  });

  it('throws when the requested user does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates a user and hashes a new password', async () => {
    const data: UpdateUserDto = { name: 'Ana Costa Silva', password: 'new-secret' };
    const expected = { id: 'user-1', name: data.name };
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
    prisma.user.update.mockResolvedValue(expected);

    await expect(service.update('user-1', data)).resolves.toEqual(expected);
    expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { name: data.name, passwordHash: 'hashed-password' },
    });
  });

  it('throws when updating a user that does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.update('missing', { name: 'Updated' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('rejects updating to another user email', async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce({ id: 'user-1' })
      .mockResolvedValueOnce({ id: 'user-2', email: 'used@example.com' });

    await expect(
      service.update('user-1', { email: 'used@example.com' }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('deletes a user', async () => {
    const expected = { id: 'user-1' };
    prisma.user.findUnique.mockResolvedValue(expected);
    prisma.user.delete.mockResolvedValue(expected);

    await expect(service.remove('user-1')).resolves.toEqual(expected);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } });
  });

  it('throws when deleting a user that does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.remove('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });
});
