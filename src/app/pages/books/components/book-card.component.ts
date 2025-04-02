import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StarRatingComponent } from '@shared/components/star-rating/star-rating.component';
import { IBook } from '@core/models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [StarRatingComponent],
  template: `
    <div class="book-card">
      <div class="book-cover">
        <img
          ngSrc="https://picsum.photos/300/450?random=1"
          fill
          [alt]="book.title"
          loading="lazy"
          (click)="onEdit()"
        />
        <button class="delete-btn" (click)="onDelete($event)">×</button>
      </div>
      <div class="book-info" (click)="onEdit()">
        <h3 class="book-title">{{ book.title }}</h3>
        <p class="book-author">by {{ book.author }}</p>

        <div class="book-rating">
          <app-star-rating
            [value]="book.rating || 0"
            [readonly]="true"
          ></app-star-rating>
        </div>

        <div class="book-meta">
          <span class="book-year">{{ book.year }}</span>
          <span class="book-genre">{{ book.genre }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .book-card {
        background-color: var(--card-bg);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .book-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      .book-cover {
        height: 250px;
        overflow: hidden;
        position: relative;
      }

      .book-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      .book-card:hover .book-cover img {
        transform: scale(1.05);
      }

      .book-info {
        padding: 15px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        cursor: pointer;
      }

      .book-title {
        margin: 0 0 5px;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-color);
      }

      .book-author {
        margin: 0 0 10px;
        font-size: 0.9rem;
        color: var(--secondary-text);
      }

      .book-rating {
        margin-bottom: 10px;
      }

      .book-meta {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
      }

      .book-year,
      .book-genre {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 4px;
        background-color: var(--tag-bg);
        color: var(--tag-text);
      }

      .delete-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgba(244, 67, 54, 0.8);
        color: white;
        border: none;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .book-card:hover .delete-btn {
        opacity: 1;
      }

      .delete-btn:hover {
        background-color: rgb(244, 67, 54);
      }
    `,
  ],
})
export class BookCardComponent {
  @Input() book!: IBook;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(event: Event): void {
    event.stopPropagation(); // Prevent triggering edit when clicking delete
    this.delete.emit();
  }
}
