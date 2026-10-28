import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { PrismaService } from '../../infrastructure/persistance/prisma/prisma.service';
@Injectable()
export class OpportunitiesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOpportunityDto: CreateOpportunityDto) {
    return this.prisma.opportunity.create({
      data: createOpportunityDto,
    });
  }

  async findAll() {
    return this.prisma.opportunity.findMany();
  }

  async findOne(id: string) {
    return this.prisma.opportunity.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    return this.prisma.opportunity.update({
      where: { id },
      data: updateOpportunityDto,
    });
  }

  async remove(id: string) {
    return this.prisma.opportunity.delete({
      where: { id },
    });
  }
}
