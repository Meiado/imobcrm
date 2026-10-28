import { OpportunityStage } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { OpportunitiesService } from './opportunities.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('OpportunitiesService', () => {
  let service: OpportunitiesService;
  const prisma = {
    opportunity: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OpportunitiesService(prisma as unknown as PrismaService);
  });

  it('creates an opportunity', async () => {
    const data: CreateOpportunityDto = {
      leadId: 'lead-1',
      brokerId: 'broker-1',
      stage: OpportunityStage.PROSPECT,
      expectedValue: 250000,
    };
    const expected = { id: 'opportunity-1' };
    prisma.opportunity.create.mockResolvedValue(expected);

    await expect(service.create(data)).resolves.toEqual(expected);
    expect(prisma.opportunity.create).toHaveBeenCalledWith({ data });
  });

  it('returns all opportunities', async () => {
    const expected = [{ id: 'opportunity-1' }];
    prisma.opportunity.findMany.mockResolvedValue(expected);

    await expect(service.findAll()).resolves.toEqual(expected);
    expect(prisma.opportunity.findMany).toHaveBeenCalledWith();
  });

  it('returns one opportunity by id', async () => {
    const expected = { id: 'opportunity-1' };
    prisma.opportunity.findUnique.mockResolvedValue(expected);

    await expect(service.findOne('opportunity-1')).resolves.toEqual(expected);
    expect(prisma.opportunity.findUnique).toHaveBeenCalledWith({
      where: { id: 'opportunity-1' },
    });
  });

  it('updates an opportunity', async () => {
    const data: UpdateOpportunityDto = { stage: OpportunityStage.VISIT };
    const expected = { id: 'opportunity-1' };
    prisma.opportunity.update.mockResolvedValue(expected);

    await expect(service.update('opportunity-1', data)).resolves.toEqual(expected);
    expect(prisma.opportunity.update).toHaveBeenCalledWith({
      where: { id: 'opportunity-1' },
      data,
    });
  });

  it('deletes an opportunity', async () => {
    const expected = { id: 'opportunity-1' };
    prisma.opportunity.delete.mockResolvedValue(expected);

    await expect(service.remove('opportunity-1')).resolves.toEqual(expected);
    expect(prisma.opportunity.delete).toHaveBeenCalledWith({
      where: { id: 'opportunity-1' },
    });
  });
});
