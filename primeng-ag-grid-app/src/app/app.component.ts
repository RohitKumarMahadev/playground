import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For ngModel

import { HeaderComponent } from './header/header.component'; // Import HeaderComponent

import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule, // Add FormsModule here
    HeaderComponent, // Add HeaderComponent here
    ButtonModule,
    ToggleButtonModule,
    CalendarModule,
    AgGridModule
  ],
  template: `
    <app-header></app-header>
    <div style="padding: 20px;">
      <h1>Main Application Content</h1>

      <h2>PrimeNG ToggleButton</h2>
      <p-toggleButton [(ngModel)]="isToggled" onLabel="Active" offLabel="Inactive"></p-toggleButton>
      <p>State: {{isToggled}}</p>

      <h2>PrimeNG Calendar (Range)</h2>
      <p-calendar [(ngModel)]="dateRange" selectionMode="range" [readonlyInput]="true"></p-calendar>
      <p>Selected Range: {{dateRange | json}}</p>

      <h2>AG-Grid Table</h2>
      <ag-grid-angular
        style="width: 100%; height: 300px;"
        class="ag-theme-alpine"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
      >
      </ag-grid-angular>

      <h2>PrimeNG Buttons</h2>
      <p-button label="Export" icon="pi pi-upload" styleClass="p-button-secondary"></p-button>
      <p-button label="Refresh" icon="pi pi-refresh" style="margin-left: .5em"></p-button>
    </div>
  `,
  styleUrls: ['./app.component.css'] // Assuming app.component.css exists or is not needed for this basic layout
})
export class AppComponent {
  title = 'primeng-ag-grid-app';
  isToggled: boolean = false;
  dateRange: Date[] | undefined;

  columnDefs: ColDef[] = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];
}
