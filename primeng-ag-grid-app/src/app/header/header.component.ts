import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <h1>My Angular App</h1>
    </header>
  `,
  styles: [
    `header { background-color: var(--primary-color); color: var(--primary-color-text); padding: 10px 20px; text-align: center; }`
  ]
})
export class HeaderComponent {

}
