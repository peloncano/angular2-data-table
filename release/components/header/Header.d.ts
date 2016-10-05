import { ElementRef, EventEmitter } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableHeader {
    private state;
    onColumnChange: EventEmitter<any>;
    readonly headerHeight: any;
    constructor(state: StateService, elm: ElementRef);
}
