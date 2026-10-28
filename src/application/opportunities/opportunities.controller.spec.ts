import type { CreateOpportunityDto } from './dto/create-opportunity.dto';
import type { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('OpportunitiesController', () => {
  let controller: OpportunitiesController;
  const opportunitiesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OpportunitiesController(
      opportunitiesService as unknown as OpportunitiesService,
    );
  });

  it('forwards opportunity creation to the service', () => {
    const data = {
      leadId: 'lead-1',
      brokerId: 'broker-1',
      expectedValue: 250000,
    } as CreateOpportunityDto;
    opportunitiesService.create.mockReturnValue('created-opportunity');

    expect(controller.create(data)).toBe('created-opportunity');
    expect(opportunitiesService.create).toHaveBeenCalledWith(data);
  });

  it('forwards listing opportunities to the service', () => {
    opportunitiesService.findAll.mockReturnValue('all-opportunities');

    expect(controller.findAll()).toBe('all-opportunities');
    expect(opportunitiesService.findAll).toHaveBeenCalledWith();
  });

  it('forwards opportunity lookup to the service', () => {
    opportunitiesService.findOne.mockReturnValue('one-opportunity');

    expect(controller.findOne('opportunity-1')).toBe('one-opportunity');
    expect(opportunitiesService.findOne).toHaveBeenCalledWith('opportunity-1');
  });

  it('forwards opportunity updates to the service', () => {
    const data = { lossReason: 'Client changed plans' } as UpdateOpportunityDto;
    opportunitiesService.update.mockReturnValue('updated-opportunity');

    expect(controller.update('opportunity-1', data)).toBe('updated-opportunity');
    expect(opportunitiesService.update).toHaveBeenCalledWith('opportunity-1', data);
  });

  it('forwards opportunity deletion to the service', () => {
    opportunitiesService.remove.mockReturnValue('deleted-opportunity');

    expect(controller.remove('opportunity-1')).toBe('deleted-opportunity');
    expect(opportunitiesService.remove).toHaveBeenCalledWith('opportunity-1');
  });
});
