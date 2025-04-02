import { Component, inject } from '@angular/core';

import { BookStoreService } from '@core/store/book.store.service';
import { IBook } from '@core/models/book.model';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { BookGridComponent } from './components/book-grid.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [SearchBarComponent, BookGridComponent],
  template: `
    <div class="container">
      <h1>Books Collection</h1>

      <app-search-bar (search)="handleSearch($event)"></app-search-bar>

      <div class="main-content">
        <div class="grid-container">
          <app-book-grid
            [books]="filteredBooks$()"
            (editBook)="handleEditBook($event)"
            (deleteBook)="handleDeleteBook($event)"
          ></app-book-grid>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        color: var(--text-color);
        margin-bottom: 20px;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .main-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
      }

      @media (max-width: 900px) {
        .toolbar {
          flex-direction: column;
          align-items: stretch;
        }

        .side-panel {
          order: -1;
        }
      }

      .grid-container {
        min-height: 600px;
      }
    `,
  ],
})
export class BooksComponent {
  #bookStore = inject(BookStoreService);
  filteredBooks$ = this.#bookStore.filteredBooks$;

  constructor() {}

  handleSearch(query: string): void {
    this.#bookStore.handleSearch(query);
  }

  handleEditBook(book: IBook): void {
    this.#bookStore.updateBook(book);
  }

  handleDeleteBook(id: string): void {
    this.#bookStore.deleteBook(id);
  }
}
