import { Injectable } from '@nestjs/common';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsRepository {
  private tickets: Map<string, Ticket> = new Map<string, Ticket>();

  public findAll(): Ticket[] {
    return [...this.tickets.values()];
  }

  public findById(id: string): Ticket {
    return this.tickets.get(id);
  }

  public save(ticket: Ticket): void {
    this.tickets.set(ticket.id, ticket);
  }

  public delete(id: string): void {
    this.tickets.delete(id);
  }
}
