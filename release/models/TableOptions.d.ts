
import { TableColumn } from './TableColumn';
import { Sort } from './Sort';
import { ColumnMode } from '../enums/ColumnMode';
import { SortType } from '../enums/SortType';
import { SelectionType } from '../enums/SelectionType';
export declare class TableOptions {
    columns: TableColumn[];
    scrollbarV: boolean;
    scrollbarH: boolean;
    rowHeight: number;
    columnMode: ColumnMode;
    loadingMessage: string;
    emptyMessage: string;
    headerHeight: any;
    footerHeight: number;
    externalPaging: boolean;
    limit: number;
    count: number;
    offset: number;
    loadingIndicator: boolean;
    selectionType: SelectionType;
    reorderable: boolean;
    sortType: SortType;
    sorts: Array<Sort>;
    tableClasses: string;
    showPageLimitOptions: boolean;
    pageLimits: Array<number>;
    defaultPageLimit: number;
    showFiltering: boolean;
    tableFilterDelay: number;
    tableFilterMinLength: number;
    showColumnOptions: boolean;
    constructor(props: any);
}
