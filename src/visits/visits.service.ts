import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVisitDto: CreateVisitDto) {
    return this.prisma.visit.create({
      data: createVisitDto
    });
  }

  async findAll() {
    return this.prisma.visit.findMany();
  }

  async findOne(id: string) {
    return this.prisma.visit.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateVisitDto: UpdateVisitDto) {
    return this.prisma.visit.update({
      where: { id },
      data: updateVisitDto
    });
  }

  async remove(id: string) {
    return this.prisma.visit.delete({
      where: { id }
    });
  }
}
