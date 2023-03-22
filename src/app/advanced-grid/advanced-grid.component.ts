import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridOptions } from "../../shared/models/advanced-grid.model";
import { MatTable } from "@angular/material/table";

@Component({
  selector: 'app-advanced-grid',
  templateUrl: './advanced-grid.component.html',
  styleUrls: ['./advanced-grid.component.scss']
})
export class AdvancedGridComponent implements OnInit, AfterViewChecked {
  @Input() rowData: any[] = [];
  @Input() gridOptions!: GridOptions;

  @ViewChild(MatTable) matTable!: MatTable<any>;

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.gridOptions.columnDefs
      .filter(colDef => !colDef.hidden)
      .map(colDef => colDef.field);
  }

  ngAfterViewChecked(): void {
    this.matTable?.updateStickyColumnStyles();
  }

  getDisplayedValue(colDef: ColDef, data: any) {
    const value = colDef.valueGetter ? colDef.valueGetter(data) : data[colDef.field];
    return colDef.valueFormatter ? colDef.valueFormatter(value) : value;
  }
}
