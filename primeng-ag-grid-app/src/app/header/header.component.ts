import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <h1>My Angular App</h1>
      <h1 class="dashboard-title">Deal Monitoring Dashboard</h1>
    </header>
  `,
  styles: [
    `header { background-color: var(--primary-color); color: var(--primary-color-text); padding: 10px 20px; text-align: center; }`,
    `
/* Style for the dashboard title to make it stand out */
.dashboard-title {
  color: #FFFFE0; /* LightYellow, good contrast on dark blue */
  font-size: 1.5em; /* Slightly smaller than the main app title perhaps */
  margin-top: 5px; /* Add some space if needed */
  margin-bottom: 5px;
}

/* Optional: Adjust the main app title if needed */
header > h1:first-of-type {
  font-size: 2em; /* Main app title */
  margin-bottom: 0;
}
`
  ]
})
export class HeaderComponent {

}
