import { Ticket } from './ticket.entity';

export class Event {
  id: number;
  title: string;
  date: Date;
  city: string;
  tickets: Ticket[];
}
