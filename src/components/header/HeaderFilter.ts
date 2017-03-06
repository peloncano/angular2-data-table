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

            <div *ngIf="state.options.showColumnOptions" class="dropdown column-toggle-ctrl" [class.open]="showOptions">
                <span class="dropdown-toggle" (click)="showOptions? showOptions = false: showOptions = true">{{columOptionsName}}</span>
                <ul class="dropdown-menu">
                <li *ngFor="let column of state.columnOptions; let i = index;">
                    <a href="javascript:void(0)" [class.off]="column.hide"
                        [class.on]="!column.hide"
                            (click)="columnOptionClick(column._index, column)">{{column.name}}</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="qa-filter-right">
            <div *ngIf="state.options.showFiltering" class="dataTables_filter">
                <label>
                    <input type="text"
                        [(ngModel)]='dtFilter'>
                </label>
                <div *ngIf="state.options.showFilteringTooltip && dtFilter &&dtFilter.length >= state.options.tableFilterMinLength" class="dt_filter-help">
                  	<span></span>
                  	<div class="tooltip">
                  		  {{state.options.filteringTooltipText}}
                  	</div>
                </div>
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

    showOptions: boolean = false;
    isFilterActive: boolean = false;

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

    /**
     *
     *
     * @readonly
     *
     * @memberOf DataTableHeaderFilter
     */
    get columOptionsName() {

        let shownCounter = 0;
        let totalCounter = this.state.columnOptions.length;

        for(let col of this.state.columnOptions) {
            if(col.hide) {
                continue;
            }
            shownCounter++;
        }

        return `${shownCounter} of ${totalCounter} Columns`;
    }

    ngOnInit() {
        this.dtPagelimit = this.state.options.defaultPageLimit;

        // https://manuel-rauber.com/2015/12/31/debouncing-angular-2-input-component/
        const eventStream = Observable.fromEvent(this.element.nativeElement, 'keyup')
            .map(() => this.dtFilter)
            .debounceTime(this.state.options.tableFilterDelay)
            .distinctUntilChanged();

        eventStream.subscribe(input => {

                // keep track if the filter input is active
                if(input && input.length >= this.state.options.tableFilterMinLength) {
                    this.isFilterActive = true;
                }

                // Check to see if the input was blanked after the min length has been entered
                if((input && input.length >= this.state.options.tableFilterMinLength) || (input === '' && this.isFilterActive)) {

                    // If we are resetting the input - it is no longer active
                    if(input === '') {
                        this.isFilterActive = false;
                    }

                    this.onDataTableFilterChange.emit(input);
                }

                return input;
            });
    }

    columnOptionClick(index, column) {
        this.onColumnChange.emit({index, column});
    }

    exportingToolClicked(event, type) {
        this.onDataTableExportToolEvent.emit({type, event});
    }

    openColumnOptions() {

    }
}
