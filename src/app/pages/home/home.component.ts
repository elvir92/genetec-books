import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="container">
      <div class="hero">
        <h1>Welcome to the Book Management App</h1>
        <p class="subtitle">
          Explore, manage, and track your book collection with real-time updates
        </p>

        <div class="cta-buttons">
          <a routerLink="/books" class="cta-button primary">Browse Books</a>
          <a routerLink="/about" class="cta-button secondary">About this App</a>
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
