import { EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableBody implements OnInit, OnDestroy {
    state: StateService;
    onRowClick: EventEmitter<any>;
    onRowSelect: EventEmitter<any>;
    rows: any;
    private sub;
    readonly selectEnabled: boolean;
    readonly bodyHeight: string;
    constructor(state: StateService, element: ElementRef);
    ngOnInit(): void;
    updatePage(direction: any): void;
    updateRows(refresh?: boolean): void;
    getRowsStyles(row: any): {
        height: string;
    };
    hideIndicator(): void;
    ngOnDestroy(): void;
}
