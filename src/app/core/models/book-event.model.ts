import { IBook } from './book.model';

export type EventType = 'add' | 'update' | 'delete';

export interface IBookEvent {
  type: EventType;
  book: IBook;
  timestamp: Date;
  property?: string; // For property-level change tracking
  oldValue?: any;
  newValue?: any;
}
