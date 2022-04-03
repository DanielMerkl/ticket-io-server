import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateEventDto } from '../src/events/dto/create-event.dto';
import { Event } from '../src/events/entities/event.entity';
import { UpdateEventDto } from '../src/events/dto/update-event.dto';
import { Ticket } from '../src/tickets/entities/ticket.entity';
import { CreateTicketDto } from '../src/tickets/dto/create-ticket.dto';

describe('EventsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/events').expect(200).expect([]);
  });

  it('CRUD', async () => {
    // CREATE
    const createEventDto: CreateEventDto = {
      title: 'Banane',
      date: new Date(),
      city: 'Nürnberg',
    };
    const createEventResponse = await request(app.getHttpServer())
      .post('/events')
      .send(createEventDto)
      .expect(201);

    const createdEvent: Event = createEventResponse.body;
    expect(createdEvent.id).toBeDefined();

    // READ
    const getEventsResponse = await request(app.getHttpServer())
      .get('/events')
      .expect(200);

    const events: Event[] = getEventsResponse.body;
    expect(events.length).toBe(1);

    // UPDATE
    const updateEventDto: UpdateEventDto = {
      title: 'Apfel',
    };
    const updateEventResponse = await request(app.getHttpServer())
      .patch(`/events/${createdEvent.id}`)
      .send(updateEventDto)
      .expect(200);

    const updatedEvent: Event = updateEventResponse.body;
    expect(updatedEvent.title).toBe(updateEventDto.title);

    // DELETE
    await request(app.getHttpServer())
      .delete(`/events/${createdEvent.id}`)
      .expect(200);

    await request(app.getHttpServer()).get('/events').expect(200).expect([]);
  });

  it('should add, get and remove tickets from event', async () => {
    // CREATE EVENT
    const createEventDto: CreateEventDto = {
      title: 'Banane',
      date: new Date(),
      city: 'Nürnberg',
    };
    const createEventResponse = await request(app.getHttpServer())
      .post('/events')
      .send(createEventDto)
      .expect(201);
    const createdEvent: Event = createEventResponse.body;

    // ADD TICKETS TO CREATED EVENT
    const firstTicketDto = {
      eventId: createdEvent.id,
      barcode: '12345678',
      firstName: 'Max',
      lastName: 'Mustermann',
    };
    const secondTicketDto = {
      eventId: createdEvent.id,
      barcode: 'abcdefgh',
      firstName: 'Hans',
      lastName: 'Muster',
    };
    await request(app.getHttpServer())
      .post(`/events/${createdEvent.id}/tickets`)
      .send(firstTicketDto)
      .expect(201);
    await request(app.getHttpServer())
      .post(`/events/${createdEvent.id}/tickets`)
      .send(secondTicketDto)
      .expect(201);

    // GET TICKETS
    const getTicketsResponse = await request(app.getHttpServer())
      .get(`/events/${createdEvent.id}/tickets`)
      .expect(200);
    const tickets: Ticket[] = getTicketsResponse.body;
    expect(tickets.length).toBe(2);
  });
});
