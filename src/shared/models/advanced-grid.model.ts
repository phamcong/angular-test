import { TemplateRef } from "@angular/core";

export interface ColDef {
  headerName?: string;
  field: string;
  valueGetter?: (data: any) => any;
  valueFormatter?: (data: any) => any;
  cellRenderer?: TemplateRef<HTMLElement>;
  hidden?: boolean,
  pinned?: 'left' | 'right'
}

export interface GridOptions {
  width?: string;
  height?: string;
  columnDefs: ColDef[]
}