import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <main class="page-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-color);
        transition: background-color 0.3s;
      }

      .page-content {
        flex: 1;
        margin-top: 60px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'elvir-genetec';
}
