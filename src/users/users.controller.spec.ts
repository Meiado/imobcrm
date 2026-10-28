import { UserRole } from '../generated/prisma/enums';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('UsersController', () => {
  let controller: UsersController;
  const usersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new UsersController(usersService as unknown as UsersService);
  });

  it('forwards user creation to the service', () => {
    const data: CreateUserDto = {
      name: 'Ana Costa',
      email: 'ana@example.com',
      password: 'secret',
      role: UserRole.BROKER,
      creci: null,
    };
    usersService.create.mockReturnValue('created-user');

    expect(controller.create(data)).toBe('created-user');
    expect(usersService.create).toHaveBeenCalledWith(data);
  });

  it('forwards listing users to the service', () => {
    usersService.findAll.mockReturnValue('all-users');

    expect(controller.findAll()).toBe('all-users');
    expect(usersService.findAll).toHaveBeenCalledWith();
  });

  it('forwards user lookup to the service', () => {
    usersService.findOne.mockReturnValue('one-user');

    expect(controller.findOne('user-1')).toBe('one-user');
    expect(usersService.findOne).toHaveBeenCalledWith('user-1');
  });

  it('forwards user updates to the service', () => {
    const data: UpdateUserDto = { name: 'Ana Silva' };
    usersService.update.mockReturnValue('updated-user');

    expect(controller.update('user-1', data)).toBe('updated-user');
    expect(usersService.update).toHaveBeenCalledWith('user-1', data);
  });

  it('forwards user deletion to the service', () => {
    usersService.remove.mockReturnValue('deleted-user');

    expect(controller.remove('user-1')).toBe('deleted-user');
    expect(usersService.remove).toHaveBeenCalledWith('user-1');
  });
});
