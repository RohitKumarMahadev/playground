import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs'; // Import Observable

import { HeaderComponent } from './header/header.component';
import { DealDataService } from './deal-data.service'; // Import DealDataService

import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
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
    InputTextModule,
    AgGridModule
  ],
  // providers: [DealDataService], // No need if providedIn: 'root'
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
  searchQuery: string = '';
  isLoading: boolean = false; // For loading state

  dateRange: Date[] | undefined;

  // Column definitions remain the same
  columnDefs: ColDef[] = [
    { headerName: '', checkboxSelection: true, headerCheckboxSelection: true, width: 50, pinned: 'left', sortable: false, filter: false, resizable: false, editable: false },
    { headerName: 'Node Id', field: 'nodeId', width: 120 },
    { headerName: 'Comments', field: 'comments', width: 200, editable: true },
    { headerName: 'Controller Comments', field: 'controllerComments', width: 200, editable: true },
    { headerName: 'Portfolio', field: 'portfolio', width: 150 },
    { headerName: 'Orig ref', field: 'origRef', width: 120 },
    { headerName: 'Trade No', field: 'tradeNo', width: 120 },
    { headerName: 'Package ID', field: 'packageId', width: 120 },
    { headerName: 'Product Type', field: 'productType', width: 150 },
    { headerName: 'Instrument', field: 'instrument', width: 150 },
    { headerName: 'Cur', field: 'cur', width: 80 },
    { headerName: 'Source', field: 'source', width: 100 },
    { headerName: 'Trade date', field: 'tradeDate', filter: 'agDateColumnFilter', width: 150 },
    { headerName: 'Business date', field: 'businessDate', filter: 'agDateColumnFilter', width: 150 },
    { headerName: 'Component', field: 'component', width: 120 },
    { headerName: 'Trade timestamp', field: 'tradeTimestamp', filter: 'agDateColumnFilter', width: 180 },
    { headerName: 'Trader', field: 'trader', width: 150 },
    { headerName: 'Counterparty', field: 'counterparty', width: 150 },
    { headerName: 'PL Explain (LCY)', field: 'plExplainLcy', filter: 'agNumberColumnFilter', width: 180, valueFormatter: params => params.value != null ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'P&L (LCY)', field: 'pnlLcy', filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => params.value != null ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'Sales Margin (LCY)', field: 'salesMarginLcy', filter: 'agNumberColumnFilter', width: 180, valueFormatter: params => params.value != null ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'PL Explain (Trading) (LCY)', field: 'plExplainTradingLcy', filter: 'agNumberColumnFilter', width: 220, valueFormatter: params => params.value != null ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'P&L(Trading) (LCY)', field: 'pnlTradingLcy', filter: 'agNumberColumnFilter', width: 180, valueFormatter: params => params.value != null ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'DTD Diff LCY', field: 'dtdDiffLcy', filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => params.value != null ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'MAT Tree', field: 'matTree', width: 120 },
    { headerName: 'Node level Id', field: 'nodeLevelId', width: 120 },
    { headerName: 'DTD/WTD/MTD/YTD', field: 'dtdWtdMtdYtd', width: 180 },
    { headerName: 'Lowest Node Lvl', field: 'lowestNodeLvl', width: 150 },
    { headerName: 'Threshold', field: 'threshold', filter: 'agNumberColumnFilter', width: 120 },
    { headerName: 'Threshold CCY', field: 'thresholdCcy', width: 120 },
    { headerName: 'Original P&L', field: 'originalPnl', filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => params.value != null ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'Before Status', field: 'beforeStatus', width: 120 },
    { headerName: 'After Status', field: 'afterStatus', width: 120 },
    { headerName: 'Text1', field: 'text1', width: 200, editable: true }
  ];

  // allRowData will now be populated by the service
  // rowData is what's bound to the grid, but setRowData is preferred for updates
  // For simplicity, we can directly use the fetched data for the grid.
  // Let's remove allRowData and rowData direct usage for grid, relying on setRowData.
  // private allRowData: any[] = []; // Not strictly needed if service fetches full sets

  private gridApi!: GridApi;

  gridOptions: GridOptions = {
    suppressRowTransform: true,
    pagination: true,
    paginationPageSize: 50,
    onGridReady: (params) => {
      this.gridApi = params.api;
      this.loadInitialDeals(); // Load initial data when grid is ready
    },
    defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
    }
  };

  constructor(private dealDataService: DealDataService) {} // Inject DealDataService

  ngOnInit() {
    // Initial data load is now handled by onGridReady to ensure gridApi is available
  }

  loadInitialDeals() {
    this.fetchDeals(this.selectedDealType);
  }

  fetchDeals(dealType: string) {
    this.isLoading = true;
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay(); // Show loading overlay on the grid
    }

    let dealsObservable: Observable<any[]>;

    if (dealType === 'dmr') {
      dealsObservable = this.dealDataService.getDmrDeals();
    } else { // 'new_deals'
      dealsObservable = this.dealDataService.getNewDeals();
    }

    dealsObservable.subscribe({
      next: (data) => {
        if (this.gridApi) {
          this.gridApi.setRowData(data); // Set data into the grid
        }
        this.isLoading = false;
        if (this.gridApi) {
          this.gridApi.hideOverlay(); // Hide loading overlay
        }
        // Re-apply search filter if any, after new data is loaded
        if (this.searchQuery && this.gridApi) {
            this.gridApi.setQuickFilter(this.searchQuery);
        }
      },
      error: (err) => {
        console.error('AppComponent: Error fetching deals', err);
        this.isLoading = false;
        if (this.gridApi) {
          this.gridApi.hideOverlay(); // Hide loading overlay
          this.gridApi.showNoRowsOverlay(); // Optionally show 'no rows' or error overlay
        }
        // Potentially set an error message to display to the user
      }
    });
  }

  onDealTypeChange() {
    // selectedDealType is already updated by [(ngModel)]
    this.fetchDeals(this.selectedDealType);
  }

  onSearchQueryChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    if (this.gridApi) {
      this.gridApi.setQuickFilter(this.searchQuery);
    }
  }

  // generateData() method is no longer needed for mock data generation
  // It can be removed.
}
