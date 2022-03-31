import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateEventDto } from '../src/events/dto/create-event.dto';
import { Event } from '../src/events/entities/event.entity';
import { UpdateEventDto } from '../src/events/dto/update-event.dto';

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
    const responseOfCreate = await request(app.getHttpServer())
      .post('/events')
      .send(createEventDto)
      .expect(201);

    const createdEvent: Event = responseOfCreate.body;
    expect(createdEvent.id).toBeDefined();

    // READ
    const responseOfRead = await request(app.getHttpServer())
      .get('/events')
      .expect(200);

    const events: Event[] = responseOfRead.body;

    expect(events.length).toBe(1);

    // UPDATE
    const updateEventDto: UpdateEventDto = {
      title: 'Apfel',
    };
    const responseOfUpdate = await request(app.getHttpServer())
      .patch(`/events/${createdEvent.id}`)
      .send(updateEventDto)
      .expect(200);

    const updatedEvent: Event = responseOfUpdate.body;
    expect(updatedEvent.title).toBe(updateEventDto.title);

    // DELETE
    await request(app.getHttpServer())
      .delete(`/events/${createdEvent.id}`)
      .expect(200);

    await request(app.getHttpServer()).get('/events').expect(200).expect([]);
  });
});
