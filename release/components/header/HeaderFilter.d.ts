import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { StateService } from '../../services/State';
import { TableColumn } from '../../models/TableColumn';
export declare class DataTableHeaderFilter implements OnInit {
    element: ElementRef;
    private state;
    showOptions: boolean;
    isFilterActive: boolean;
    dtPagelimit: number;
    dtFilter: string;
    model: TableColumn;
    onDataTableLengthChange: EventEmitter<any>;
    onDataTableFilterChange: EventEmitter<any>;
    onDataTableExportToolEvent: EventEmitter<any>;
    onColumnChange: EventEmitter<any>;
    constructor(element: ElementRef, state: StateService);
    /**
     *
     *
     * @readonly
     *
     * @memberOf DataTableHeaderFilter
     */
    readonly columOptionsName: string;
    ngOnInit(): void;
    columnOptionClick(index: any, column: any): void;
    exportingToolClicked(event: any, type: any): void;
    openColumnOptions(): void;
}
