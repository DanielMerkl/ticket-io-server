import { Test, TestingModule } from '@nestjs/testing';
import { TicketsRepository } from './tickets.repository';

describe('TicketsRepository', () => {
  let repository: TicketsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsRepository],
    }).compile();

    repository = module.get<TicketsRepository>(TicketsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
