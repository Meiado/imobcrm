import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prismaService.user.findUnique({ where: { email: createUserDto.email } });
    if (userExists) throw new BadRequestException('User with this email already exists');

    const { password, ...rest } = createUserDto;
    const passwordHash = await bcrypt.hash(password, 10);

    return this.prismaService.user.create({ data: { ...rest, passwordHash } });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);

    const emailExists = updateUserDto.email ? await this.prismaService.user.findUnique({ where: { email: updateUserDto.email } }) : null;
    if (emailExists && emailExists.id !== id) throw new BadRequestException('User with this email already exists');

    const { password, ...rest } = updateUserDto;
    const updateData = {
      ...rest,
      ...(password && { passwordHash: await bcrypt.hash(password, 10) }),
    };

    return this.prismaService.user.update({ where: { id }, data: updateData });
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);

    return this.prismaService.user.delete({ where: { id } });
  }
}
