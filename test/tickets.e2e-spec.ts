import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTicketDto } from '../src/tickets/dto/create-ticket.dto';
import { Ticket } from '../src/tickets/entities/ticket.entity';
import { UpdateTicketDto } from '../src/tickets/dto/update-ticket.dto';

describe('TicketsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/tickets').expect(200).expect([]);
  });

  it('CRUD', async () => {
    // CREATE
    const createTicketDto: CreateTicketDto = {
      eventId: '1',
      barcode: '1234abcd',
      firstName: 'Max',
      lastName: 'Mustermann',
    };
    const createTicketResponse = await request(app.getHttpServer())
      .post('/tickets')
      .send(createTicketDto)
      .expect(201);

    const createdTicket: Ticket = createTicketResponse.body;
    expect(createdTicket.id).toBeDefined();

    // READ
    const getTicketsResponse = await request(app.getHttpServer())
      .get(`/tickets`)
      .expect(200);

    const tickets: Ticket[] = getTicketsResponse.body;
    expect(tickets.length).toBe(1);

    // UPDATE
    const updateTicketDto: UpdateTicketDto = {
      firstName: 'Maximilian',
    };
    const updateTicketResponse = await request(app.getHttpServer())
      .patch(`/tickets/${createdTicket.id}`)
      .send(updateTicketDto)
      .expect(200);

    const updatedTicket: Ticket = updateTicketResponse.body;
    expect(updatedTicket.firstName).toBe(updateTicketDto.firstName);

    // DELETE
    await request(app.getHttpServer())
      .delete(`/tickets/${createdTicket.id}`)
      .expect(200);

    await request(app.getHttpServer()).get('/tickets').expect(200).expect([]);
  });
});
