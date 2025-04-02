import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BookCardComponent } from './book-card.component';
import { IBook } from '@core/models/book.model';
import { BookEditModalComponent } from './book-edit-modal/book-edit-modal.component';

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [BookCardComponent, BookEditModalComponent],
  template: `
    @if(selectedBook){
    <app-book-edit-modal
      [book]="selectedBook"
      (save)="handleSaveBook($event)"
      (close)="closeEditModal()"
    ></app-book-edit-modal>

    }
    <div class="book-grid">
      @for (book of books; track book.id) {
      <app-book-card
        [book]="book"
        (edit)="openEditModal(book)"
        (delete)="handleDeleteBook(book.id)"
      ></app-book-card>
      } @empty {
      <div class="no-books">
        No books found. Try a different search term or add a new book.
      </div>
      }
    </div>
  `,
  styles: [
    `
      .book-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        padding: 20px 0;
      }

      .no-books {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        background-color: var(--secondary-bg);
        border-radius: 8px;
        color: var(--text-color);
      }
    `,
  ],
})
export class BookGridComponent {
  @Input() books: IBook[] = [];
  @Output() editBook = new EventEmitter<IBook>();
  @Output() deleteBook = new EventEmitter<string>();

  selectedBook: IBook | null = null;

  openEditModal(book: IBook): void {
    this.selectedBook = { ...book }; // Clone to avoid direct mutation
  }

  closeEditModal(): void {
    this.selectedBook = null;
  }

  handleSaveBook(updatedBook: IBook): void {
    this.editBook.emit(updatedBook);
    this.closeEditModal();
  }

  handleDeleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.deleteBook.emit(id);
    }
  }
}
