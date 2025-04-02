import { Injectable, signal, computed } from '@angular/core';

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../models/book.model';
import { EventType } from '../models/book-event.model';
import { BookUtil } from '@core/helpers/book.util';

interface IBookStoreState {
  loading: boolean;
  books: IBook[];
  searchTerm: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  readonly #state = signal<IBookStoreState>({
    loading: false,
    books: BookUtil.getMockBooks(),
    searchTerm: '',
  });
  books$ = computed(() => this.#state().books);
  filteredBooks$ = computed(() => {
    const term = this.searchTerm$();
    const books = this.books$();
    if (!term.trim()) {
      return books;
    }

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
    );
  });
  searchTerm$ = computed(() => this.#state().searchTerm);

  #stopEvents$ = new Subject<void>();
  #eventGenerationActive = true;

  constructor() {
    // Start the mock event generator
    this.#startMockEventGeneration();
  }

  handleSearch(searchTerm: string): void {
    this.#state.update((state) => ({
      ...state,
      searchTerm,
    }));
  }

  addBook(book: IBook): void {
    const newBook = { ...book, id: BookUtil.generateId() };
    this.#state.update((state) => ({
      ...state,
      books: [...state.books, newBook],
    }));
  }

  updateBook(updatedBook: IBook): void {
    console.log('updateBook', updatedBook);
    this.#state.update((state) => ({
      ...state,
      books: state.books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      ),
    }));
  }

  deleteBook(id: string): void {
    const bookToDelete = this.books$().find((book) => book.id === id);

    if (bookToDelete) {
      this.#state.update((state) => ({
        ...state,
        books: state.books.filter((book) => book.id !== id),
      }));
    }
  }

  resetToDefault(): void {
    // Stop events temporarily
    const wasActive = this.#eventGenerationActive;
    if (wasActive) {
      this.#stopEventGeneration();
    }

    this.#state.update((state) => ({
      ...state,
      books: BookUtil.getMockBooks(),
      filteredBooks: BookUtil.getMockBooks(),
    }));

    // Restart events if they were active
    if (wasActive) {
      this.#startMockEventGeneration();
    }
  }

  #startMockEventGeneration(): void {
    // Don't start if already active
    if (this.#eventGenerationActive) {
      return;
    }

    this.#eventGenerationActive = true;

    // Create a new subject since the old one might be completed
    this.#stopEvents$ = new Subject<void>();

    // Generate a random event every 8-15 seconds
    interval(8000 + Math.random() * 7000)
      .pipe(takeUntil(this.#stopEvents$))
      .subscribe(() => {
        this.#generateRandomEvent();
      });
  }

  #stopEventGeneration(): void {
    this.#eventGenerationActive = false;
    this.#stopEvents$.next();
    this.#stopEvents$.complete();
  }

  #generateRandomEvent(): void {
    const eventTypes: EventType[] = ['add', 'update', 'delete'];
    const randomType =
      eventTypes[Math.floor(Math.random() * eventTypes.length)];

    const books = this.books$();

    switch (randomType) {
      case 'add':
        const newBook = BookUtil.generateMockBook();
        this.addBook(newBook);
        break;

      case 'update':
        if (books.length > 0) {
          const randomIndex = Math.floor(Math.random() * books.length);
          const bookToUpdate = { ...books[randomIndex] };

          // Randomly update a property
          const updateProps = ['title', 'description', 'year'];
          const propToUpdate =
            updateProps[Math.floor(Math.random() * updateProps.length)];
          const oldValue = (bookToUpdate as any)[propToUpdate];

          if (propToUpdate === 'title') {
            bookToUpdate.title = `${bookToUpdate.title} (Revised)`;
          } else if (propToUpdate === 'description') {
            bookToUpdate.description = `${bookToUpdate.description} Updated with new content.`;
          } else if (propToUpdate === 'year') {
            bookToUpdate.year = bookToUpdate.year + 1;
          }

          this.updateBook(bookToUpdate);
        }
        break;

      case 'delete':
        if (books.length > 3) {
          // Ensure we keep some books
          const randomIndex = Math.floor(Math.random() * books.length);
          this.deleteBook(books[randomIndex].id);
        } else {
          // If we have too few books, add one instead
          this.addBook(BookUtil.generateMockBook());
        }
        break;
    }
  }
}
