import { Test, TestingModule } from '@nestjs/testing';
import { EventsRepository } from './events.repository';
import { Event } from './entities/event.entity';

describe('EventsRepository', () => {
  let repository: EventsRepository;

  let event: Event;
  const DEFAULT_EVENT_ID = '1';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsRepository],
    }).compile();

    repository = module.get<EventsRepository>(EventsRepository);

    event = {
      id: DEFAULT_EVENT_ID,
      title: 'Banane',
      city: 'Nürnberg',
      date: new Date(),
    };
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should save new events', () => {
    expect(repository.findAll().length).toBe(0);

    repository.save(event);

    expect(repository.findAll().length).toBe(1);
  });

  it('should find events by id', () => {
    repository.save(event);

    expect(repository.findById('123')).toBeUndefined();
    expect(repository.findById(DEFAULT_EVENT_ID)).toBeDefined();
  });

  it('should delete events', () => {
    repository.save(event);

    expect(repository.findAll().length).toBe(1);

    repository.delete(DEFAULT_EVENT_ID);

    expect(repository.findAll().length).toBe(0);
  });
});
