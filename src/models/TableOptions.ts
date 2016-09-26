import { TableColumn } from './TableColumn';
import { Sort } from './Sort';
import { ColumnMode } from '../enums/ColumnMode';
import { SortType } from '../enums/SortType';
import { SelectionType } from '../enums/SelectionType';

export class TableOptions {

  // Columns
  columns: TableColumn[] = [];

  // Enable vertical scrollbars
  scrollbarV: boolean = false;

  // Enable horz scrollbars
  scrollbarH: boolean = false;

  // The row height; which is necessary
  // to calculate the height for the lazy rendering.
  rowHeight: number = 30;

  // flex
  // force
  // standard
  columnMode: ColumnMode = ColumnMode.standard;

  // Loading message presented when the array is undefined
  loadingMessage: string = 'Loading...';

  // Message to show when array is presented
  // but contains no values
  emptyMessage: string = 'No data to display';

  // The minimum header height in pixels.
  // pass falsey for no header
  // note: number|string does not work right
  headerHeight: any = 30;

  // The minimum footer height in pixels.
  // pass falsey for no footer
  footerHeight: number = 0;

  // if external paging is turned on
  externalPaging: boolean = false;

  // Page size
  limit: number = undefined;

  // Total count
  count: number = 0;

  // Page offset
  offset: number = 0;

  // Loading indicator
  loadingIndicator: boolean = false;

  // Selections?
  selectionType: SelectionType;

  // if you can reorder columns
  reorderable: boolean = true;

  // type of sorting
  sortType: SortType = SortType.single;

  // sorts
  sorts: Array<Sort> = [];

  // Page Limit options
  showPageLimitOptions: boolean = true;

  // Default page limits options
  pageLimits: Array<number> = [10, 25, 50, 100];

  // default page limit
  defaultPageLimit: number = 50;

  // filtering search
  showFiltering: boolean = true;

  // filter delay in milliseconds
  tableFilterDelay: number = 300;

  // filter minimun characters
  tableFilterMinLength: number = 3; 
  
  // column options
  showColumnOptions: boolean = true;

  constructor(props: any) {
    Object.assign(this, props);
  }

}
