"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var State_1 = require('../../services/State');
var TableColumn_1 = require('../../models/TableColumn');
var Rx_1 = require('rxjs/Rx');
var DataTableHeaderFilter = (function () {
    function DataTableHeaderFilter(element, state) {
        this.element = element;
        this.state = state;
        this.showOptions = false;
        this.isFilterActive = false;
        this.onDataTableLengthChange = new core_1.EventEmitter();
        this.onDataTableFilterChange = new core_1.EventEmitter();
        this.onDataTableExportToolEvent = new core_1.EventEmitter();
        this.onColumnChange = new core_1.EventEmitter();
        // element.nativeElement.classList.add('datatable-header-cell');
    }
    Object.defineProperty(DataTableHeaderFilter.prototype, "columOptionsName", {
        /**
         *
         *
         * @readonly
         *
         * @memberOf DataTableHeaderFilter
         */
        get: function () {
            var shownCounter = 0;
            var totalCounter = this.state.columnOptions.length;
            for (var _i = 0, _a = this.state.columnOptions; _i < _a.length; _i++) {
                var col = _a[_i];
                if (col.hide) {
                    continue;
                }
                shownCounter++;
            }
            return shownCounter + " of " + totalCounter + " Columns";
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderFilter.prototype.ngOnInit = function () {
        var _this = this;
        this.dtPagelimit = this.state.options.defaultPageLimit;
        // https://manuel-rauber.com/2015/12/31/debouncing-angular-2-input-component/
        var eventStream = Rx_1.Observable.fromEvent(this.element.nativeElement, 'keyup')
            .map(function () { return _this.dtFilter; })
            .debounceTime(this.state.options.tableFilterDelay)
            .distinctUntilChanged();
        eventStream.subscribe(function (input) {
            // keep track if the filter input is active
            if (input && input.length >= _this.state.options.tableFilterMinLength) {
                _this.isFilterActive = true;
            }
            // Check to see if the input was blanked after the min length has been entered
            if ((input && input.length >= _this.state.options.tableFilterMinLength) || (input === '' && _this.isFilterActive)) {
                // If we are resetting the input - it is no longer active
                if (input === '') {
                    _this.isFilterActive = false;
                }
                _this.onDataTableFilterChange.emit(input);
            }
            return input;
        });
    };
    DataTableHeaderFilter.prototype.columnOptionClick = function (index, column) {
        this.onColumnChange.emit({ index: index, column: column });
    };
    DataTableHeaderFilter.prototype.exportingToolClicked = function (event, type) {
        this.onDataTableExportToolEvent.emit({ type: type, event: event });
    };
    DataTableHeaderFilter.prototype.openColumnOptions = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderFilter.prototype, "dtPagelimit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableColumn_1.TableColumn)
    ], DataTableHeaderFilter.prototype, "model", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderFilter.prototype, "onDataTableLengthChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderFilter.prototype, "onDataTableFilterChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderFilter.prototype, "onDataTableExportToolEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderFilter.prototype, "onColumnChange", void 0);
    DataTableHeaderFilter = __decorate([
        core_1.Component({
            selector: 'div[datatable-header-filter]',
            template: "\n    <div class=\"filter-ctrl\">\n        <div class=\"qa-filter-left\">\n            <div *ngIf=\"state.options.showPageLimitOptions\" class=\"dataTables_length\">\n                <label>Show\n                <select\n                    [(ngModel)]='dtPagelimit'\n                    (ngModelChange)='onDataTableLengthChange.emit($event)'\n                            name=\"search-results_length\">\n                    <option\n                        *ngFor=\"let pageLimitValue of state.options.pageLimits\"\n                         [ngValue]=\"pageLimitValue\"\n                        >{{pageLimitValue}}</option>\n                    </select> entries</label>\n            </div>\n\n            <div *ngIf=\"state.options.showColumnOptions\" class=\"dropdown column-toggle-ctrl\" [class.open]=\"showOptions\">\n                <span class=\"dropdown-toggle\" (click)=\"showOptions? showOptions = false: showOptions = true\">{{columOptionsName}}</span>\n                <ul class=\"dropdown-menu\">\n                <li *ngFor=\"let column of state.columnOptions; let i = index;\">\n                    <a href=\"javascript:void(0)\" [class.off]=\"column.hide\"\n                        [class.on]=\"!column.hide\"\n                            (click)=\"columnOptionClick(i, column)\">{{column.name}}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <div class=\"qa-filter-right\">\n            <div *ngIf=\"state.options.showFiltering\" class=\"dataTables_filter\">\n                <label>\n                    <input type=\"text\"\n                        [(ngModel)]='dtFilter'>\n                </label>\n                <div *ngIf=\"state.options.showFilteringTooltip && dtFilter &&dtFilter.length >= state.options.tableFilterMinLength\" class=\"dt_filter-help\">\n                  \t<span></span>\n                  \t<div class=\"tooltip\">\n                  \t\t  {{state.options.filteringTooltipText}}\n                  \t</div>\n                </div>\n            </div>\n            <div *ngIf=\"state.options.showExportingTool\" class=\"dropdown ng2-export-tool export-tool \">\n                <span class=\"dropdown-toggle\">Export</span>\n                <div class=\"dropdown-menu\">\n                    <a *ngFor=\"let exportingOption of state.options.exportingTools\"\n                        [className]=\"exportingOption.class\"\n                            (click)=\"exportingToolClicked($event, exportingOption.type)\" >\n                        <span>{{exportingOption.label}}</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n  ",
            host: {
                '[className]': '\'filter-ctrl\''
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, State_1.StateService])
    ], DataTableHeaderFilter);
    return DataTableHeaderFilter;
}());
exports.DataTableHeaderFilter = DataTableHeaderFilter;
//# sourceMappingURL=HeaderFilter.js.map