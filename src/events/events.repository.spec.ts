import { Test, TestingModule } from '@nestjs/testing';
import { EventsRepository } from './events.repository';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';

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
      tickets: [],
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

  it('should add tickets', () => {
    repository.save(event);

    expect(repository.findById(DEFAULT_EVENT_ID).tickets.length).toBe(0);

    repository.addTicket(DEFAULT_EVENT_ID, {
      barcode: '123',
      firstName: 'Max',
      lastName: 'Mustermann',
    });

    expect(repository.findById(DEFAULT_EVENT_ID).tickets.length).toBe(1);
  });

  it('should remove tickets', () => {
    repository.save(event);

    expect(repository.findById(DEFAULT_EVENT_ID).tickets.length).toBe(0);

    const ticket: Ticket = {
      barcode: '123',
      firstName: 'Max',
      lastName: 'Mustermann',
    };

    repository.addTicket(DEFAULT_EVENT_ID, ticket);

    expect(repository.findById(DEFAULT_EVENT_ID).tickets.length).toBe(1);

    repository.removeTicket(DEFAULT_EVENT_ID, ticket);

    expect(repository.findById(DEFAULT_EVENT_ID).tickets.length).toBe(0);
  });
});
