import type { CreateLeadDto } from './dto/create-lead.dto';
import type { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('LeadsController', () => {
  let controller: LeadsController;
  const leadsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new LeadsController(leadsService as unknown as LeadsService);
  });

  it('forwards lead creation to the service', () => {
    const data = { name: 'Ana Costa', email: 'ana@example.com' } as CreateLeadDto;
    leadsService.create.mockReturnValue('created-lead');

    expect(controller.create(data)).toBe('created-lead');
    expect(leadsService.create).toHaveBeenCalledWith(data);
  });

  it('forwards listing leads to the service', () => {
    leadsService.findAll.mockReturnValue('all-leads');

    expect(controller.findAll()).toBe('all-leads');
    expect(leadsService.findAll).toHaveBeenCalledWith();
  });

  it('forwards lead lookup to the service', () => {
    leadsService.findOne.mockReturnValue('one-lead');

    expect(controller.findOne('lead-1')).toBe('one-lead');
    expect(leadsService.findOne).toHaveBeenCalledWith('lead-1');
  });

  it('forwards lead updates to the service', () => {
    const data = { name: 'Ana Silva' } as UpdateLeadDto;
    leadsService.update.mockReturnValue('updated-lead');

    expect(controller.update('lead-1', data)).toBe('updated-lead');
    expect(leadsService.update).toHaveBeenCalledWith('lead-1', data);
  });

  it('forwards lead deletion to the service', () => {
    leadsService.remove.mockReturnValue('deleted-lead');

    expect(controller.remove('lead-1')).toBe('deleted-lead');
    expect(leadsService.remove).toHaveBeenCalledWith('lead-1');
  });
});
