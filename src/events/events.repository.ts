import { Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class EventsRepository {
  private events: Map<string, Event> = new Map<string, Event>();

  public findAll(): Event[] {
    return [...this.events.values()];
  }

  public findById(id: string): Event {
    return this.events.get(id);
  }

  public save(event: Event): void {
    this.events.set(event.id, event);
  }

  public delete(id: string): void {
    this.events.delete(id);
  }

  public addTicket(eventId: string, ticket: Ticket) {
    const event = this.events.get(eventId);
    event.tickets.push(ticket);
    this.events.set(eventId, event);
  }

  public removeTicket(eventId: string, ticket: Ticket) {
    const event = this.events.get(eventId);
    event.tickets = event.tickets.filter((t) => t.barcode !== ticket.barcode);
    this.events.set(eventId, event);
  }
}
