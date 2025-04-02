import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeStoreService {
  // Store for the theme, atm only one property
  #store = signal<boolean>(this.#getInitialThemePreference());
  isDarkMode$ = computed(() => {
    const isDark = this.#store();
    this.#applyTheme(isDark);
    return isDark;
  });

  handleToggleTheme(): void {
    const newValue = !this.#store();
    this.#store.set(newValue);
    localStorage.setItem('darkMode', newValue.toString());
  }

  #getInitialThemePreference(): boolean {
    // Check local storage
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference) {
      return Boolean(JSON.parse(storedPreference));
    }

    // Check system preference
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  #applyTheme(isDark: boolean): void {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }
}
