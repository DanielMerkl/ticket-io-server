import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';
import { v4 as uuidV4 } from 'uuid';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  create(createEventDto: CreateEventDto): Event {
    const newEvent = {
      ...createEventDto,
      id: uuidV4(),
    };
    this.eventsRepository.save(newEvent);
    return newEvent;
  }

  findAll(): Event[] {
    return this.eventsRepository.findAll();
  }

  findOne(id: string): Event {
    return this.eventsRepository.findById(id);
  }

  update(id: string, updateEventDto: UpdateEventDto): Event {
    const event = this.eventsRepository.findById(id);
    const updatedEvent = {
      ...event,
      ...updateEventDto,
    };
    this.eventsRepository.save(updatedEvent);
    return updatedEvent;
  }

  remove(id: string) {
    this.eventsRepository.delete(id);
  }
}
