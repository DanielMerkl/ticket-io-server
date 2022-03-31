import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { EventsRepository } from '../events/events.repository';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, EventsRepository],
})
export class TicketsModule {}
