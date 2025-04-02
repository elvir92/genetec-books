import { Component, Output, EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-bar">
      <input
        type="text"
        [(ngModel)]="searchQuery"
        (input)="onSearch()"
        placeholder="Search books by title or author..."
        class="search-input"
        />
      @if (searchQuery) {
        <button (click)="clearSearch()" class="clear-btn">
          ×
        </button>
      }
    </div>
    `,
  styles: [
    `
      .search-bar {
        width: 100%;
        max-width: 600px;
        margin: 0 auto 30px;
        position: relative;
      }

      .search-input {
        width: 100%;
        padding: 12px 40px 12px 15px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background-color: var(--input-bg);
        color: var(--text-color);
        font-size: 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        transition: box-shadow 0.3s, border-color 0.3s;
      }

      .search-input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .clear-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 20px;
        color: var(--secondary-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      .clear-btn:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchQuery = '';

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }
}
