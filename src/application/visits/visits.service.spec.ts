import { VisitStatus } from '../../infrastructure/persistance/generated/prisma/enums';
import { PrismaService } from '../../infrastructure/persistance/prisma/prisma.service';
import type { CreateVisitDto } from './dto/create-visit.dto';
import type { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitsService } from './visits.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('VisitsService', () => {
  let service: VisitsService;
  const prisma = {
    visit: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new VisitsService(prisma as unknown as PrismaService);
  });

  it('creates a visit', async () => {
    const data: CreateVisitDto = {
      leadId: 'lead-1',
      brokerId: 'broker-1',
      opportunityId: 'opportunity-1',
      scheduledAt: new Date('2026-10-28T15:00:00.000Z'),
      durationMin: 60,
      status: VisitStatus.SCHEDULED,
      feedback: 'Confirmar presença',
    };
    const expected = { id: 'visit-1' };
    prisma.visit.create.mockResolvedValue(expected);

    await expect(service.create(data)).resolves.toEqual(expected);
    expect(prisma.visit.create).toHaveBeenCalledWith({ data });
  });

  it('returns all visits', async () => {
    const expected = [{ id: 'visit-1' }];
    prisma.visit.findMany.mockResolvedValue(expected);

    await expect(service.findAll()).resolves.toEqual(expected);
    expect(prisma.visit.findMany).toHaveBeenCalledWith();
  });

  it('returns one visit by id', async () => {
    const expected = { id: 'visit-1' };
    prisma.visit.findUnique.mockResolvedValue(expected);

    await expect(service.findOne('visit-1')).resolves.toEqual(expected);
    expect(prisma.visit.findUnique).toHaveBeenCalledWith({
      where: { id: 'visit-1' },
    });
  });

  it('updates a visit', async () => {
    const data: UpdateVisitDto = { status: VisitStatus.COMPLETED };
    const expected = { id: 'visit-1' };
    prisma.visit.update.mockResolvedValue(expected);

    await expect(service.update('visit-1', data)).resolves.toEqual(expected);
    expect(prisma.visit.update).toHaveBeenCalledWith({
      where: { id: 'visit-1' },
      data,
    });
  });

  it('deletes a visit', async () => {
    const expected = { id: 'visit-1' };
    prisma.visit.delete.mockResolvedValue(expected);

    await expect(service.remove('visit-1')).resolves.toEqual(expected);
    expect(prisma.visit.delete).toHaveBeenCalledWith({
      where: { id: 'visit-1' },
    });
  });
});
