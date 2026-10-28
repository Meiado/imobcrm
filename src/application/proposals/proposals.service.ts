import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { PrismaService } from '../../infrastructure/persistance/prisma/prisma.service';

@Injectable()
export class ProposalsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProposalDto: CreateProposalDto) {
    return this.prisma.proposal.create({
      data: createProposalDto,
    });
  }

  async findAll() {
    return this.prisma.proposal.findMany();
  }

  async findOne(id: string) {
    return this.prisma.proposal.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateProposalDto: UpdateProposalDto) {
    return this.prisma.proposal.update({
      where: { id },
      data: updateProposalDto,
    });
  }

  async remove(id: string) {
    return this.prisma.proposal.delete({
      where: { id },
    });
  }
}
