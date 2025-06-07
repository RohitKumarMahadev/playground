import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';

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

  dateRange: Date[] | undefined;

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
    { headerName: 'PL Explain (LCY)', field: 'plExplainLcy', filter: 'agNumberColumnFilter', width: 180, valueFormatter: params => params.value ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'P&L (LCY)', field: 'pnlLcy', filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => params.value ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'Sales Margin (LCY)', field: 'salesMarginLcy', filter: 'agNumberColumnFilter', width: 180, valueFormatter: params => params.value ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'PL Explain (Trading) (LCY)', field: 'plExplainTradingLcy', filter: 'agNumberColumnFilter', width: 220, valueFormatter: params => params.value ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'P&L(Trading) (LCY)', field: 'pnlTradingLcy', filter: 'agNumberColumnFilter', width: 180, valueFormatter: params => params.value ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'DTD Diff LCY', field: 'dtdDiffLcy', filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => params.value ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'MAT Tree', field: 'matTree', width: 120 },
    { headerName: 'Node level Id', field: 'nodeLevelId', width: 120 },
    { headerName: 'DTD/WTD/MTD/YTD', field: 'dtdWtdMtdYtd', width: 180 },
    { headerName: 'Lowest Node Lvl', field: 'lowestNodeLvl', width: 150 },
    { headerName: 'Threshold', field: 'threshold', filter: 'agNumberColumnFilter', width: 120 },
    { headerName: 'Threshold CCY', field: 'thresholdCcy', width: 120 },
    { headerName: 'Original P&L', field: 'originalPnl', filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => params.value ? Number(params.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '' },
    { headerName: 'Before Status', field: 'beforeStatus', width: 120 },
    { headerName: 'After Status', field: 'afterStatus', width: 120 },
    { headerName: 'Text1', field: 'text1', width: 200, editable: true }
  ];

  allRowData: any[] = [];
  rowData: any[] = [];

  private gridApi!: GridApi;

  gridOptions: GridOptions = {
    suppressRowTransform: true,
    pagination: true,
    paginationPageSize: 50,
    onGridReady: (params) => {
      this.gridApi = params.api;
      this.updateGridData();
    },
    defaultColDef: {
        resizable: true,
        sortable: true, // Make all columns sortable by default
        filter: true, // Make all columns filterable by default
    }
  };

  ngOnInit() {
    this.generateData();
  }

  generateData() {
    this.allRowData = [];
    const portfolios = ['Portfolio A', 'Portfolio B', 'Portfolio C', 'Global Equities', 'Fixed Income'];
    const productTypes = ['Swap', 'Option', 'Future', 'Bond', 'Equity', 'FX Spot'];
    const instruments = ['IRS USD 5Y', 'EUR Call Opt', 'ES Mini Fut', 'US Treasury 10Y', 'AAPL Stock', 'EUR/USD'];
    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'CAD'];
    const sources = ['Internal', 'Bloomberg', 'Reuters', 'Tradeweb'];
    const traders = ['Trader X', 'Trader Y', 'Trader Z', 'AutoBot'];
    const counterparties = ['Bank A', 'Fund B', 'Corp C', 'Clearing House D'];
    const statuses = ['Active', 'Expired', 'Cancelled', 'Pending', 'Approved'];
    const randomChars = (length: number) => Math.random().toString(36).substring(2, 2 + length);
    const randomDate = (startYear = 2020, endYear = 2024) => {
        const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1; // Keep it simple, avoid month length issues
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };
    const randomTimestamp = (dateStr: string) => `${dateStr}T${String(Math.floor(Math.random()*24)).padStart(2, '0')}:${String(Math.floor(Math.random()*60)).padStart(2, '0')}:${String(Math.floor(Math.random()*60)).padStart(2, '0')}Z`;

    for (let i = 1; i <= 1000; i++) {
      const tradeDate = randomDate();
      this.allRowData.push({
        id: i, // Keep id for internal tracking if needed, though not in new column list
        nodeId: `NID-${1000 + i}`,
        comments: `Comment for item ${i}`,
        controllerComments: (i % 5 === 0) ? `Controller review for ${i}` : '',
        portfolio: portfolios[i % portfolios.length],
        origRef: `REF${2000 + i}`,
        tradeNo: `TRD${3000 + i}`,
        packageId: (i % 10 === 0) ? `PKG${4000 + i / 10}` : '',
        productType: productTypes[i % productTypes.length],
        instrument: instruments[i % instruments.length],
        cur: currencies[i % currencies.length],
        source: sources[i % sources.length],
        tradeDate: tradeDate,
        businessDate: randomDate(),
        component: `Comp-${randomChars(3).toUpperCase()}`,
        tradeTimestamp: randomTimestamp(tradeDate),
        trader: traders[i % traders.length],
        counterparty: counterparties[i % counterparties.length],
        plExplainLcy: parseFloat((Math.random() * 20000 - 10000).toFixed(2)),
        pnlLcy: parseFloat((Math.random() * 10000 - 5000).toFixed(2)),
        salesMarginLcy: parseFloat((Math.random() * 5000).toFixed(2)),
        plExplainTradingLcy: parseFloat((Math.random() * 15000 - 7500).toFixed(2)),
        pnlTradingLcy: parseFloat((Math.random() * 12000 - 6000).toFixed(2)),
        dtdDiffLcy: parseFloat((Math.random() * 1000 - 500).toFixed(2)),
        matTree: `Tree${String.fromCharCode(65 + (i % 5))}`, // TreeA, TreeB, ...
        nodeLevelId: `NLID-${500 + i}`,
        dtdWtdMtdYtd: `${(Math.random()*10).toFixed(1)}/${(Math.random()*20).toFixed(1)}/${(Math.random()*50).toFixed(1)}/${(Math.random()*200).toFixed(1)}`,
        lowestNodeLvl: `Lvl ${i % 5 + 1}`,
        threshold: parseFloat((Math.random() * 100000).toFixed(2)),
        thresholdCcy: currencies[i % currencies.length],
        originalPnl: parseFloat((Math.random() * 10000 - 4000).toFixed(2)),
        beforeStatus: statuses[i % statuses.length],
        afterStatus: statuses[(i + 1) % statuses.length],
        text1: `Some descriptive text for ${i}`,
        dealCategory: (i % 3 === 0) ? 'dmr' : 'new_deals' // Keep for existing filter
      });
    }
  }

  updateGridData() {
    if (!this.allRowData || this.allRowData.length === 0) {
      if (this.allRowData.length === 0 && this.gridApi) {
         // Ensure generateData is called if allRowData is empty when grid is ready
         this.generateData();
      } else if (this.allRowData.length === 0) {
          this.generateData();
      }
    }
    const filteredData = this.allRowData.filter(row => row.dealCategory === this.selectedDealType);
    this.rowData = filteredData;
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  onDealTypeChange() {
    this.updateGridData();
    if (this.searchQuery && this.gridApi) {
        this.gridApi.setQuickFilter(this.searchQuery);
    }
  }

  onSearchQueryChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    if (this.gridApi) {
      this.gridApi.setQuickFilter(this.searchQuery);
    }
  }
}
