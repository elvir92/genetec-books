import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <div class="logo">BookHub</div>
      <ul class="nav-links">
        <li>
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Home</a
          >
        </li>
        <li><a routerLink="/books" routerLinkActive="active">Books</a></li>
        <li><a routerLink="/about" routerLinkActive="active">About</a></li>
      </ul>
    </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 60px;
        background-color: var(--primary-color);
        color: white;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .nav-links {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .nav-links li {
        margin-left: 20px;
      }

      .nav-links a {
        color: white;
        text-decoration: none;
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.3s;
      }

      .nav-links a:hover,
      .nav-links a.active {
        background-color: rgba(255, 255, 255, 0.2);
      }
    `,
  ],
})
export class NavbarComponent {}
