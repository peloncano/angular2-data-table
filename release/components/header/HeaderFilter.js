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
        this.onDataTableLengthChange = new core_1.EventEmitter();
        this.onDataTableFilterChange = new core_1.EventEmitter();
        // element.nativeElement.classList.add('datatable-header-cell');
    }
    DataTableHeaderFilter.prototype.ngOnInit = function () {
        var _this = this;
        this.dtPagelimit = this.state.options.defaultPageLimit;
        // https://manuel-rauber.com/2015/12/31/debouncing-angular-2-input-component/
        var eventStream = Rx_1.Observable.fromEvent(this.element.nativeElement, 'keyup')
            .map(function () { return _this.dtFilter; })
            .debounceTime(this.state.options.tableFilterDelay)
            .distinctUntilChanged();
        eventStream.subscribe(function (input) {
            return input && input.length >= _this.state.options.tableFilterMinLength ?
                _this.onDataTableFilterChange.emit(input) : input;
        });
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
    DataTableHeaderFilter = __decorate([
        core_1.Component({
            selector: 'div[datatable-header-filter]',
            template: "\n    <div class=\"filter-ctrl\">\n        <div class=\"qa-filter-left\">\n            <div *ngIf=\"state.options.showPageLimitOptions\" class=\"dataTables_length\">\n                <label>Show \n                <select \n                    [(ngModel)]='dtPagelimit'\n                    (ngModelChange)='onDataTableLengthChange.emit($event)' \n                            name=\"search-results_length\">\n                    <option \n                        *ngFor=\"let pageLimitValue of state.options.pageLimits\" \n                         [ngValue]=\"pageLimitValue\" \n                        >{{pageLimitValue}}</option>\n                    </select> entries</label>\n            </div>\n\n            <div *ngIf=\"state.options.showColumnOptions\" class=\"dropdown column-toggle-ctrl\">\n                <span class=\"dropdown-toggle\">Columns</span>\n                <ul class=\"dropdown-menu\">\n                <li><a href=\"javascript:void(0)\" class=\"off\">Column 1</a></li>\n                <li><a href=\"javascript:void(0)\" class=\"off\">Column 2</a></li>\n                <li><a href=\"javascript:void(0)\" class=\"on\">Column 3</a></li>\n                </ul>\n            </div>\n        </div>\n\n        <div class=\"qa-filter-right\">\n            <div *ngIf=\"state.options.showFiltering\" class=\"dataTables_filter\">\n                <label>\n                    <input type=\"text\" \n                        [(ngModel)]='dtFilter'>\n                </label>\n            </div>\n            <div class=\"dropdown qa-export-tool \">\n                <span class=\"dropdown-toggle\">Export</span>\n                <div class=\"dropdown-menu DTTT_container \">\n                    <a class=\"DTTT_button DTTT_button_copy\" >\n                        <span>Copy</span>\n                    </a>\n                    <a class=\"DTTT_button DTTT_button_print\" title=\"View print view\">\n                        <span>Print</span>\n                    </a>\n                    <a class=\"DTTT_button DTTT_button_csv\">\n                        <span>CSV</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n  ",
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