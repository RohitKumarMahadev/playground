import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For ngModel

import { HeaderComponent } from './header/header.component'; // Import HeaderComponent

import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community'; // Import GridOptions

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
        style="width: 100%; height: 350px;"
        class="ag-theme-alpine"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        [gridOptions]="gridOptions"
        [rowSelection]="'multiple'"
        [suppressRowClickSelection]="true"
      >
      </ag-grid-angular>

      <h2>PrimeNG Buttons</h2>
      <p-button label="Export" icon="pi pi-upload" styleClass="p-button-secondary"></p-button>
      <p-button label="Refresh" icon="pi pi-refresh" style="margin-left: .5em"></p-button>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'primeng-ag-grid-app';
  isToggled: boolean = false;
  dateRange: Date[] | undefined;

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, width: 70 },
    { headerName: 'Make', field: 'make', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Year', field: 'year', sortable: true, filter: true, width: 100 },
    { headerName: 'Color', field: 'color', sortable: true, filter: true, width: 120 },
    { headerName: 'Mileage', field: 'mileage', sortable: true, filter: 'agNumberColumnFilter', width: 120 },
    { headerName: 'VIN', field: 'vin', sortable: true, width: 170 },
    { headerName: 'Owner', field: 'owner', sortable: true, filter: true, width: 150 },
    { headerName: 'Last Service Date', field: 'lastServiceDate', sortable: true, filter: 'agDateColumnFilter', width: 180 },
    { headerName: 'Price', field: 'price', sortable: true, filter: 'agNumberColumnFilter', valueFormatter: params => '$' + params.value.toLocaleString(), width: 120 }
  ];

  rowData = [
    { id: 1, make: 'Toyota', model: 'Celica', year: 2002, color: 'Red', mileage: 85000, vin: 'TY123456789', owner: 'John Doe', lastServiceDate: '2023-01-15', price: 35000 },
    { id: 2, make: 'Ford', model: 'Mondeo', year: 2010, color: 'Blue', mileage: 62000, vin: 'FD987654321', owner: 'Jane Smith', lastServiceDate: '2022-11-20', price: 32000 },
    { id: 3, make: 'Porsche', model: 'Boxster', year: 2015, color: 'Silver', mileage: 30000, vin: 'PS654321987', owner: 'Mike Brown', lastServiceDate: '2023-03-10', price: 72000 },
    { id: 4, make: 'Honda', model: 'Civic', year: 2018, color: 'Black', mileage: 45000, vin: 'HN246813579', owner: 'Alice Green', lastServiceDate: '2023-02-01', price: 22000 },
    { id: 5, make: 'BMW', model: 'X5', year: 2016, color: 'White', mileage: 55000, vin: 'BM135792468', owner: 'Bob White', lastServiceDate: '2023-04-25', price: 45000 }
  ];

  gridOptions: GridOptions = {
    suppressRowTransform: true, // Optional: Improves performance for wider grids
  };
}
