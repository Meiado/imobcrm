import { InteractionType, LeadSource } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsService } from './leads.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('LeadsService', () => {
  let service: LeadsService;
  const prisma = {
    lead: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    leadInteraction: {
      create: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new LeadsService(prisma as unknown as PrismaService);
  });

  it('creates a lead', async () => {
    const data: CreateLeadDto = {
      name: 'Ana Costa',
      email: 'ana@example.com',
      source: LeadSource.REFERRAL,
    };
    const expected = { id: 'lead-1' };
    prisma.lead.create.mockResolvedValue(expected);

    await expect(service.create(data)).resolves.toEqual(expected);
    expect(prisma.lead.create).toHaveBeenCalledWith({ data });
  });

  it('returns all leads', async () => {
    const expected = [{ id: 'lead-1' }];
    prisma.lead.findMany.mockResolvedValue(expected);

    await expect(service.findAll()).resolves.toEqual(expected);
    expect(prisma.lead.findMany).toHaveBeenCalledWith();
  });

  it('returns one lead by id', async () => {
    const expected = { id: 'lead-1' };
    prisma.lead.findUnique.mockResolvedValue(expected);

    await expect(service.findOne('lead-1')).resolves.toEqual(expected);
    expect(prisma.lead.findUnique).toHaveBeenCalledWith({
      where: { id: 'lead-1' },
    });
  });

  it('updates a lead', async () => {
    const data: UpdateLeadDto = { name: 'Ana Costa Silva' };
    const expected = { id: 'lead-1' };
    prisma.lead.update.mockResolvedValue(expected);

    await expect(service.update('lead-1', data)).resolves.toEqual(expected);
    expect(prisma.lead.update).toHaveBeenCalledWith({
      where: { id: 'lead-1' },
      data,
    });
  });

  it('deletes a lead', async () => {
    const expected = { id: 'lead-1' };
    prisma.lead.delete.mockResolvedValue(expected);

    await expect(service.remove('lead-1')).resolves.toEqual(expected);
    expect(prisma.lead.delete).toHaveBeenCalledWith({ where: { id: 'lead-1' } });
  });

  it('creates a lead interaction', async () => {
    const data: CreateInteractionDto = {
      leadId: 'lead-1',
      userId: 'user-1',
      interactionType: InteractionType.CALL,
      content: 'Contato inicial',
    };
    const expected = { id: 'interaction-1' };
    prisma.leadInteraction.create.mockResolvedValue(expected);

    await expect(service.createInteraction(data)).resolves.toEqual(expected);
    expect(prisma.leadInteraction.create).toHaveBeenCalledWith({ data });
  });
});
