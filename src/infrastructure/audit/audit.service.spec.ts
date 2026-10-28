import { AuditLogAction } from '../persistance/generated/prisma/enums';
import { PrismaService } from '../persistance/prisma/prisma.service';
import { AuditLogDto } from './dto/audit-log.dto';
import { AuditService } from './audit.service';

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('AuditService', () => {
  let service: AuditService;
  const prismaService = {
    auditLog: {
      create: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuditService(prismaService as unknown as PrismaService);
  });

  it('creates an audit log entry', async () => {
    const data: AuditLogDto = {
      userId: 'user-1',
      action: AuditLogAction.INSERT,
      entity: 'Lead',
      entityId: 'lead-1',
      newValue: { name: 'Ana Costa' },
    };
    const expected = { id: 'audit-1' };
    prismaService.auditLog.create.mockResolvedValue(expected);

    await expect(service.auditAction(data)).resolves.toEqual(expected);
    expect(prismaService.auditLog.create).toHaveBeenCalledWith({ data });
  });
});
