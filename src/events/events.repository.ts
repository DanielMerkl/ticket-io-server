import { Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class EventsRepository {
  private events: Map<number, Event> = new Map<number, Event>();

  public findAll(): Event[] {
    return [...this.events.values()];
  }

  public findById(id: number): Event {
    return this.events.get(id);
  }

  public save(event: Event): void {
    this.events.set(event.id, event);
  }

  public delete(id: number): void {
    this.events.delete(id);
  }

  public addTicket(eventId: number, ticket: Ticket) {
    const event = this.events.get(eventId);
    event.tickets.push(ticket);
    this.events.set(eventId, event);
  }

  public removeTicket(eventId: number, ticket: Ticket) {
    const event = this.events.get(eventId);
    event.tickets = event.tickets.filter((t) => t.barcode !== ticket.barcode);
    this.events.set(eventId, event);
  }
}
