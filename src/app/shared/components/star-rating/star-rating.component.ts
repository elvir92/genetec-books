import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  template: `
    <div class="star-rating" [class.readonly]="readonly">
      @for (star of stars; track $index) {
      <span
        class="star"
        [class.filled]="star <= value"
        (click)="!readonly && onRatingChange(star)"
        (mouseenter)="!readonly && onHover(star)"
        (mouseleave)="!readonly && onLeave()"
      >
        ★
      </span>
      } @if (showRatingValue) {
      <span class="rating-value">{{ value || 'Not rated' }}</span>
      }
    </div>
  `,
  styles: [
    `
      .star-rating {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .star {
        color: #ccc;
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.2s, transform 0.2s;
      }

      .star.filled {
        color: #ffc107;
      }

      .star:hover {
        transform: scale(1.2);
      }

      .readonly .star {
        cursor: default;
      }

      .readonly .star:hover {
        transform: none;
      }

      .rating-value {
        margin-left: 8px;
        font-size: 0.9rem;
        color: var(--secondary-text);
      }
    `,
  ],
})
export class StarRatingComponent {
  @Input() value: number = 0;
  @Input() readonly: boolean = false;
  @Input() showRatingValue: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];
  hoverValue: number = 0;

  onRatingChange(value: number): void {
    this.value = value;
    this.ratingChange.emit(value);
  }

  onHover(value: number): void {
    this.hoverValue = value;
  }

  onLeave(): void {
    this.hoverValue = 0;
  }
}
