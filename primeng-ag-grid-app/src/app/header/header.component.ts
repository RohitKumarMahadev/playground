import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <h1 class="dashboard-title">Deal Monitoring Dashboard</h1>
      <p class="dashboard-subtext">Overview of deal activities and performance metrics.</p>
    </header>
  `,
  styles: [`
    header {
      padding: 10px 20px;
      text-align: left;
      border-bottom: 1px solid #eee; /* Optional: add a light border if bg is removed */
    }
    .dashboard-title {
      color: #333;
      font-size: 1.8em;
      margin-top: 0; /* Adjusted */
      margin-bottom: 2px;
    }
    .dashboard-subtext {
      color: #555;
      font-size: 0.9em;
      margin-top: 0;
      margin-bottom: 5px; /* Added some margin below subtext */
    }
  `]
})
export class HeaderComponent {

}
