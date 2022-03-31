export class Ticket {
  id: string;
  eventId: string;
  // TODO: add validation (alphanumeric, max length 8)
  barcode: string;
  firstName: string;
  lastName: string;
}
