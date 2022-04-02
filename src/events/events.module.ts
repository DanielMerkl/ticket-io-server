import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  imports: [TicketsModule],
})
export class EventsModule {}
