import { Ticket } from './ticket.entity';

export class Event {
  id: string;
  title: string;
  date: Date;
  city: string;
  tickets: Ticket[];
}
