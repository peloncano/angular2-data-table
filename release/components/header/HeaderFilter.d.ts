import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { StateService } from '../../services/State';
import { TableColumn } from '../../models/TableColumn';
export declare class DataTableHeaderFilter implements OnInit {
    element: ElementRef;
    private state;
    dtPagelimit: number;
    dtFilter: string;
    model: TableColumn;
    onDataTableLengthChange: EventEmitter<any>;
    onDataTableFilterChange: EventEmitter<any>;
    onDataTableExportToolEvent: EventEmitter<any>;
    onColumnChange: EventEmitter<any>;
    constructor(element: ElementRef, state: StateService);
    ngOnInit(): void;
    columnOptionClick(index: any, column: any): void;
    exportingToolClicked(event: any, type: any): void;
}
