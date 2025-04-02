
import { Component, inject } from '@angular/core';
import { ThemeStoreService } from '@core/store/theme.store.service';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <div class="container">
      <h1>About This Application</h1>
      <p>
        This is a book management application built with Angular, demonstrating:
      </p>
      <ul>
        <li>State management with Angular Signals</li>
        <li>Standalone components</li>
        <li>Real-time event handling</li>
        <li>Responsive design</li>
      </ul>

      <div class="theme-toggle">
        <h2>Theme Preferences</h2>
        <button (click)="handleToggleTheme()">
          {{ isDarkMode$() ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }
      h1,
      h2 {
        color: var(--text-color);
      }
      ul {
        margin-bottom: 30px;
      }
      .theme-toggle {
        margin-top: 30px;
        padding: 20px;
        border-radius: 8px;
        background-color: var(--secondary-bg);
      }
      button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        background-color: var(--primary-color);
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      button:hover {
        background-color: var(--primary-color-dark);
      }
    `,
  ],
})
export class AboutComponent {
  #themeStore = inject(ThemeStoreService);
  isDarkMode$ = this.#themeStore.isDarkMode$;

  handleToggleTheme() {
    this.#themeStore.handleToggleTheme();
  }
}
