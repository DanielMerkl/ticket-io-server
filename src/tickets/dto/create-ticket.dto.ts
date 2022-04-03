import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateTicketDto {
  eventId: string;
  @IsAlphanumeric()
  @MaxLength(8)
  barcode: string;
  firstName: string;
  lastName: string;
}
