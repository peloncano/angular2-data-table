import {
    Component,
    OnInit,
    Input,
    ElementRef,
    EventEmitter,
    Output
} from '@angular/core';

import { StateService } from '../../services/State';
import { TableColumn } from '../../models/TableColumn';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'div[datatable-header-filter]',
    template: `
    <div class="filter-ctrl">
        <div class="qa-filter-left">
            <div *ngIf="state.options.showPageLimitOptions" class="dataTables_length">
                <label>Show 
                <select 
                    [(ngModel)]='dtPagelimit'
                    (ngModelChange)='onDataTableLengthChange.emit($event)' 
                            name="search-results_length">
                    <option 
                        *ngFor="let pageLimitValue of state.options.pageLimits" 
                         [ngValue]="pageLimitValue" 
                        >{{pageLimitValue}}</option>
                    </select> entries</label>
            </div>

            <div *ngIf="state.options.showColumnOptions" class="dropdown column-toggle-ctrl">
                <span class="dropdown-toggle">Columns</span>
                <ul class="dropdown-menu">
                <li *ngFor="let column of state.options.columns; let i = index;"><a href="javascript:void(0)" [class.off]="column.hide" [class.on]="!column.hide" (click)="columnOptionClick(i, column)">{{column.name}}</a></li>
                </ul>
            </div>
        </div>

        <div class="qa-filter-right">
            <div *ngIf="state.options.showFiltering" class="dataTables_filter">
                <label>
                    <input type="text" 
                        [(ngModel)]='dtFilter'>
                </label>
            </div>
            <div *ngIf="state.options.showExportingTool" class="dropdown ng2-export-tool export-tool ">
                <span class="dropdown-toggle">Export</span>
                <div class="dropdown-menu">
                    <a *ngFor="let exportingOption of state.options.exportingTools" 
                        [className]="exportingOption.class" 
                            (click)="exportingToolClicked($event, exportingOption.type)" >
                        <span>{{exportingOption.label}}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
  `,
    host: {
        '[className]': '\'filter-ctrl\''
    }
})
export class DataTableHeaderFilter implements OnInit {

    @Input() dtPagelimit: number;
    dtFilter: string;
    @Input() model: TableColumn;

    @Output() onDataTableLengthChange: EventEmitter<any> = new EventEmitter();
    @Output() onDataTableFilterChange: EventEmitter<any> = new EventEmitter();
    @Output() onDataTableExportToolEvent: EventEmitter<any> = new EventEmitter();
    @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

    constructor(public element: ElementRef, private state: StateService) {
        // element.nativeElement.classList.add('datatable-header-cell');
    }

    ngOnInit() {
        this.dtPagelimit = this.state.options.defaultPageLimit;

        // https://manuel-rauber.com/2015/12/31/debouncing-angular-2-input-component/
        const eventStream = Observable.fromEvent(this.element.nativeElement, 'keyup')
            .map(() => this.dtFilter)
            .debounceTime(this.state.options.tableFilterDelay)
            .distinctUntilChanged();

        eventStream.subscribe(input =>
                input && input.length >= this.state.options.tableFilterMinLength ?
                this.onDataTableFilterChange.emit(input) : input);
    }

    columnOptionClick(index, column) {
        this.onColumnChange.emit({index, column});
    }

    exportingToolClicked(event, type) {
        this.onDataTableExportToolEvent.emit({type, event});
    }
}
