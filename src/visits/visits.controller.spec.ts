import { VisitStatus } from '../generated/prisma/enums';
import type { CreateVisitDto } from './dto/create-visit.dto';
import type { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('VisitsController', () => {
  let controller: VisitsController;
  const visitsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new VisitsController(visitsService as unknown as VisitsService);
  });

  it('forwards visit creation to the service', () => {
    const data: CreateVisitDto = {
      leadId: 'lead-1',
      brokerId: 'broker-1',
      opportunityId: 'opportunity-1',
      scheduledAt: new Date('2026-10-28T15:00:00.000Z'),
      durationMin: 60,
      status: VisitStatus.SCHEDULED,
    };
    visitsService.create.mockReturnValue('created-visit');

    expect(controller.create(data)).toBe('created-visit');
    expect(visitsService.create).toHaveBeenCalledWith(data);
  });

  it('forwards listing visits to the service', () => {
    visitsService.findAll.mockReturnValue('all-visits');

    expect(controller.findAll()).toBe('all-visits');
    expect(visitsService.findAll).toHaveBeenCalledWith();
  });

  it('forwards visit lookup with its string id', () => {
    const id = '550e8400-e29b-41d4-a716-446655440000';
    visitsService.findOne.mockReturnValue('one-visit');

    expect(controller.findOne(id)).toBe('one-visit');
    expect(visitsService.findOne).toHaveBeenCalledWith(id);
  });

  it('forwards visit updates with its string id', () => {
    const id = '550e8400-e29b-41d4-a716-446655440000';
    const data: UpdateVisitDto = { status: VisitStatus.COMPLETED };
    visitsService.update.mockReturnValue('updated-visit');

    expect(controller.update(id, data)).toBe('updated-visit');
    expect(visitsService.update).toHaveBeenCalledWith(id, data);
  });

  it('forwards visit deletion with its string id', () => {
    const id = '550e8400-e29b-41d4-a716-446655440000';
    visitsService.remove.mockReturnValue('deleted-visit');

    expect(controller.remove(id)).toBe('deleted-visit');
    expect(visitsService.remove).toHaveBeenCalledWith(id);
  });
});
