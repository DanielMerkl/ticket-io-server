import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsRepository } from './tickets.repository';
import { Ticket } from './entities/ticket.entity';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) {}

  create(createTicketDto: CreateTicketDto): Ticket {
    const newTicket: Ticket = {
      ...createTicketDto,
      id: uuidV4(),
    };
    this.ticketsRepository.save(newTicket);
    return newTicket;
  }

  findAll() {
    return this.ticketsRepository.findAll();
  }

  findOne(id: string) {
    return this.ticketsRepository.findById(id);
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = this.ticketsRepository.findById(id);
    const updatedTicket: Ticket = {
      ...ticket,
      ...updateTicketDto,
    };
    this.ticketsRepository.save(updatedTicket);
    return updatedTicket;
  }

  remove(id: string) {
    return this.ticketsRepository.delete(id);
  }
}
