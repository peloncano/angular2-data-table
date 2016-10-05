import { ElementRef } from '@angular/core';
import { StateService } from '../../services/State';
export declare class DataTableBodyRow {
    state: StateService;
    row: any;
    constructor(state: StateService, element: ElementRef);
}
