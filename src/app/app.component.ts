import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For ngModel
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';

import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton'; // Changed from ToggleButtonModule
import { CalendarModule } from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    BrowserAnimationsModule,
    HeaderComponent,
    ButtonModule,
    SelectButtonModule, // Changed from ToggleButtonModule
    CalendarModule,
    AgGridModule
  ],
  templateUrl: './app.component.html', // Changed to templateUrl
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'primeng-ag-grid-app';

  // Options for SelectButton
  dealTypeOptions: any[] = [
    { label: 'DMR', value: 'dmr' },
    { label: 'New Deals', value: 'new_deals' }
  ];
  selectedDealType: string = 'dmr'; // Default selected value

  dateRange: Date[] | undefined;

  columnDefs: ColDef[] = [
    // Existing columns (10)
    { headerName: 'ID', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, width: 70, pinned: 'left' }, // Pinned ID
    { headerName: 'Make', field: 'make', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Year', field: 'year', sortable: true, filter: true, width: 100 },
    { headerName: 'Color', field: 'color', sortable: true, filter: true, width: 120 },
    { headerName: 'Mileage', field: 'mileage', sortable: true, filter: 'agNumberColumnFilter', width: 120 },
    { headerName: 'VIN', field: 'vin', sortable: true, width: 170 },
    { headerName: 'Owner', field: 'owner', sortable: true, filter: true, width: 150 },
    { headerName: 'Last Service', field: 'lastServiceDate', sortable: true, filter: 'agDateColumnFilter', width: 180 },
    { headerName: 'Price', field: 'price', sortable: true, filter: 'agNumberColumnFilter', valueFormatter: params => params.value ? '$' + params.value.toLocaleString() : '', width: 120 },
    // Additional columns to reach 20+ (adding 10 more)
    { headerName: 'Status', field: 'status', sortable: true, filter: true, width: 100 },
    { headerName: 'Location', field: 'location', sortable: true, filter: true, width: 130 },
    { headerName: 'Dealer ID', field: 'dealerId', sortable: true, filter: true, width: 120 },
    { headerName: 'Stock Date', field: 'stockDate', sortable: true, filter: 'agDateColumnFilter', width: 150 },
    { headerName: 'Condition', field: 'condition', sortable: true, filter: true, width: 120 },
    { headerName: 'Notes', field: 'notes', sortable: false, width: 200, editable: true },
    { headerName: 'Warranty Expires', field: 'warrantyExpires', sortable: true, filter: 'agDateColumnFilter', width: 180 },
    { headerName: 'Category', field: 'category', sortable: true, filter: true, width: 120 },
    { headerName: 'Assigned To', field: 'assignedTo', sortable: true, filter: true, width: 150 },
    { headerName: 'Priority', field: 'priority', sortable: true, filter: true, width: 100 }
  ];

  rowData = [
    { id: 1, make: 'Toyota', model: 'Celica', year: 2002, color: 'Red', mileage: 85000, vin: 'TY123456789', owner: 'John Doe', lastServiceDate: '2023-01-15', price: 35000, status: 'Available', location: 'Lot A', dealerId: 'DLR001', stockDate: '2022-12-01', condition: 'Used', notes: 'Minor scratch on bumper', warrantyExpires: '2024-01-15', category: 'Sport', assignedTo: 'Sales Team A', priority: 'High' },
    { id: 2, make: 'Ford', model: 'Mondeo', year: 2010, color: 'Blue', mileage: 62000, vin: 'FD987654321', owner: 'Jane Smith', lastServiceDate: '2022-11-20', price: 32000, status: 'Sold', location: 'N/A', dealerId: 'DLR002', stockDate: '2022-10-10', condition: 'Used', notes: '', warrantyExpires: '2023-11-20', category: 'Sedan', assignedTo: 'Sales Team B', priority: 'Medium' },
    { id: 3, make: 'Porsche', model: 'Boxster', year: 2015, color: 'Silver', mileage: 30000, vin: 'PS654321987', owner: 'Mike Brown', lastServiceDate: '2023-03-10', price: 72000, status: 'Available', location: 'Showroom', dealerId: 'DLR001', stockDate: '2023-02-15', condition: 'Certified', notes: 'Excellent condition', warrantyExpires: '2026-03-10', category: 'Convertible', assignedTo: 'Sales Team A', priority: 'High' },
    { id: 4, make: 'Honda', model: 'Civic', year: 2018, color: 'Black', mileage: 45000, vin: 'HN246813579', owner: 'Alice Green', lastServiceDate: '2023-02-01', price: 22000, status: 'Available', location: 'Lot B', dealerId: 'DLR003', stockDate: '2023-01-20', condition: 'Used', notes: 'New tires', warrantyExpires: '2024-02-01', category: 'Sedan', assignedTo: 'Sales Team C', priority: 'Medium' },
    { id: 5, make: 'BMW', model: 'X5', year: 2016, color: 'White', mileage: 55000, vin: 'BM135792468', owner: 'Bob White', lastServiceDate: '2023-04-25', price: 45000, status: 'On Hold', location: 'Service Center', dealerId: 'DLR002', stockDate: '2023-03-05', condition: 'Used', notes: 'Awaiting parts', warrantyExpires: '2025-04-25', category: 'SUV', assignedTo: 'Service Dept', priority: 'Low' }
  ];

  gridOptions: GridOptions = {
    suppressRowTransform: true,
    // defaultColDef: { // Optional: define default properties for all columns
    //   resizable: true,
    // }
  };
}