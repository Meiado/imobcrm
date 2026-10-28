import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PrismaService } from '../../infrastructure/persistance/prisma/prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLeadDto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: createLeadDto,
    });
  }

  async findAll() {
    return this.prisma.lead.findMany();
  }

  async findOne(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  async remove(id: string) {
    return this.prisma.lead.delete({
      where: { id },
    });
  }

  async createInteraction(data: CreateInteractionDto) {
    return this.prisma.leadInteraction.create({
      data
    });
  }
}
