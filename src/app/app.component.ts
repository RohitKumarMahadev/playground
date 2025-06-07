import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';

import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    HeaderComponent,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    AgGridModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'primeng-ag-grid-app';

  dealTypeOptions: any[] = [
    { label: 'DMR', value: 'dmr' },
    { label: 'New Deals', value: 'new_deals' }
  ];
  selectedDealType: string = 'dmr';

  dateRange: Date[] | undefined;
  isCalendarReadonly: boolean = true;

  columnDefs: ColDef[] = [
    { headerName: '', checkboxSelection: true, headerCheckboxSelection: true, width: 50, pinned: 'left', sortable: false, filter: false, resizable: false, editable: false },
    { headerName: 'Make', field: 'make', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true, width: 150 },
    { headerName: 'Year', field: 'year', sortable: true, filter: true, width: 100 },
    { headerName: 'Color', field: 'color', sortable: true, filter: true, width: 120 },
    { headerName: 'Mileage', field: 'mileage', sortable: true, filter: 'agNumberColumnFilter', width: 120 },
    { headerName: 'VIN', field: 'vin', sortable: true, width: 170 },
    { headerName: 'Owner', field: 'owner', sortable: true, filter: true, width: 150 },
    { headerName: 'Last Service', field: 'lastServiceDate', sortable: true, filter: 'agDateColumnFilter', width: 180 },
    { headerName: 'Price', field: 'price', sortable: true, filter: 'agNumberColumnFilter', valueFormatter: params => params.value ? '$' + params.value.toLocaleString() : '', width: 120 },
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

  allRowData: any[] = [];
  rowData: any[] = []; // This will still hold the filtered data for direct binding if needed, but gridApi is prime.

  private gridApi!: GridApi;

  gridOptions: GridOptions = {
    suppressRowTransform: true,
    pagination: true,
    paginationPageSize: 50,
    onGridReady: (params) => {
      this.gridApi = params.api;
      this.updateGridData(); // Call updateGridData after grid is ready and API is available
    }
  };

  ngOnInit() {
    this.generateData();
    // Initial data load is now handled by onGridReady to ensure gridApi is set.
  }

  generateData() {
    const makes = ['Toyota', 'Ford', 'Porsche', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus', 'Subaru', 'Kia'];
    const models = ['Celica', 'Mondeo', 'Boxster', 'Civic', 'X5', 'C-Class', 'A4', 'RX350', 'Outback', 'Sorento'];
    const colors = ['Red', 'Blue', 'Silver', 'Black', 'White', 'Green', 'Yellow', 'Grey', 'Brown', 'Orange'];
    const owners = ['John Doe', 'Jane Smith', 'Mike Brown', 'Alice Green', 'Bob White', 'Charlie Black', 'David King', 'Eve Queen', 'Frank Prince', 'Grace Lord'];
    const statuses = ['Available', 'Sold', 'On Hold', 'In Service'];
    const conditions = ['New', 'Used', 'Certified'];
    const categories = ['Sedan', 'SUV', 'Truck', 'Sport', 'Convertible', 'Hatchback'];
    const priorities = ['High', 'Medium', 'Low'];

    for (let i = 1; i <= 1000; i++) {
      this.allRowData.push({
        id: i,
        make: makes[i % makes.length],
        model: models[i % models.length],
        year: 2000 + (i % 24),
        color: colors[i % colors.length],
        mileage: Math.floor(Math.random() * 150000) + 5000,
        vin: 'VIN' + (100000000 + i),
        owner: owners[i % owners.length],
        lastServiceDate: `2023-${(i % 12) + 1}-${(i % 28) + 1}`,
        price: Math.floor(Math.random() * 70000) + 15000,
        status: statuses[i % statuses.length],
        location: `Lot ${String.fromCharCode(65 + (i % 10))}`,
        dealerId: `DLR${100 + (i % 5)}`,
        stockDate: `2022-${(i % 12) + 1}-${(i % 28) + 1}`,
        condition: conditions[i % conditions.length],
        notes: (i % 10 === 0) ? 'Special discount available' : 'Standard model',
        warrantyExpires: `2025-${(i % 12) + 1}-${(i % 28) + 1}`,
        category: categories[i % categories.length],
        assignedTo: `Team ${String.fromCharCode(65 + (i % 3))}`,
        priority: priorities[i % priorities.length],
        dealCategory: (i % 3 === 0) ? 'dmr' : 'new_deals'
      });
    }
  }

  updateGridData() {
    if (!this.allRowData || this.allRowData.length === 0) {
      // Data might not be generated yet if onGridReady is called before ngOnInit finishes generateData
      // This order should be fine with generateData in ngOnInit and updateGridData in onGridReady
      // but as a safeguard:
      if (this.allRowData.length === 0) this.generateData();
    }

    const filteredData = this.allRowData.filter(row => row.dealCategory === this.selectedDealType);
    this.rowData = filteredData; // Keep local copy if needed for other bindings

    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    } else {
      // console.warn('Grid API not available yet for setRowData');
      // This case should be minimized by calling updateGridData from onGridReady.
    }
  }

  onDealTypeChange() {
    // console.log('Deal type changed to:', this.selectedDealType);
    this.updateGridData();
  }
}