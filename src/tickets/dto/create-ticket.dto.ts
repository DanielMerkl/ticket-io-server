export class CreateTicketDto {
  eventId: string;
  // TODO: add validation (alphanumeric, max length 8)
  barcode: string;
  firstName: string;
  lastName: string;
}
