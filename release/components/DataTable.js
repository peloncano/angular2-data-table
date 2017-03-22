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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var TableOptions_1 = require('../models/TableOptions');
var TableColumn_1 = require('../models/TableColumn');
var DataTableColumn_1 = require('./DataTableColumn');
var State_1 = require('../services/State');
var DataTable = (function () {
    function DataTable(state, element, differs) {
        this.state = state;
        this.onPageChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onColumnChange = new core_1.EventEmitter();
        this.onDataTableLengthChange = new core_1.EventEmitter();
        this.onDataTableFilterChange = new core_1.EventEmitter();
        this.onDataTableExportToolEvent = new core_1.EventEmitter();
        this.element = element.nativeElement;
        this.element.classList.add('datatable');
        this.rowDiffer = differs.find({}).create(null);
        this.colDiffer = differs.find({}).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        var _this = this;
        var _a = this, options = _a.options, rows = _a.rows, selected = _a.selected;
        this.state
            .setOptions(options)
            .setRows(rows)
            .setSelected(selected);
        this.pageSubscriber = this.state.onPageChange.subscribe(function (action) {
            _this.onPageChange.emit({
                page: action.value,
                offset: _this.state.options.offset,
                limit: _this.state.pageSize,
                count: _this.state.rowCount
            });
        });
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.adjustColumns();
        if (this.columns.length) {
            setTimeout(function () {
                for (var _i = 0, _a = _this.columns.toArray(); _i < _a.length; _i++) {
                    var col = _a[_i];
                    _this.options.columns.push(new TableColumn_1.TableColumn(col));
                }
            });
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.state.setRows(this.rows);
            this.onRowsUpdate.emit(this.rows);
        }
        this.checkColumnChanges();
    };
    DataTable.prototype.ngOnDestroy = function () {
        this.pageSubscriber.unsubscribe();
    };
    DataTable.prototype.checkColumnChanges = function () {
        var colDiff = this.colDiffer.diff(this.options.columns);
        if (colDiff) {
            var chngd_1 = false;
            colDiff.forEachAddedItem(function () {
                chngd_1 = true;
                return false;
            });
            if (!chngd_1) {
                colDiff.forEachRemovedItem(function () {
                    chngd_1 = true;
                    return false;
                });
            }
            // if a column was added or removed
            // we need to re-adjust columns
            if (chngd_1)
                this.adjustColumns();
        }
    };
    DataTable.prototype.adjustSizes = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.state.innerWidth = Math.floor(width);
        if (this.options.scrollbarV) {
            if (this.options.headerHeight)
                height = height - this.options.headerHeight;
            if (this.options.footerHeight)
                height = height - this.options.footerHeight;
            this.state.bodyHeight = height;
        }
        this.adjustColumns();
    };
    DataTable.prototype.adjustColumns = function (forceIdx) {
        if (!this.options.columns)
            return;
        // Retrieve column options; returns 'null' if it doesn't exist
        var persistedColumnOptionsString = localStorage.getItem(this.options.persistColumnOptions);
        if (persistedColumnOptionsString) {
            // array of booleans from local storage
            var persistedColumnOptions = JSON.parse(persistedColumnOptionsString);
            // check sizes of the one retrieved from local storage vs the table's 
            if (persistedColumnOptions.length == this.options.columns.length) {
                // loop through every column and set the hide as it was on the backed up column option
                for (var index = 0; index < this.options.columns.length; index++) {
                    this.options.columns[index].hide = persistedColumnOptions[index];
                }
            }
            else {
                // size don't match something is wrong; clear the local storage
                localStorage.removeItem(this.options.persistColumnOptions);
            }
        }
        var width = this.state.innerWidth;
        if (this.options.scrollbarV) {
            width = width - this.state.scrollbarWidth;
        }
        // if (this.options.columnMode === ColumnMode.force) {
        //   forceFillColumnWidths(this.options.columns, width, forceIdx);
        // } else if (this.options.columnMode === ColumnMode.flex) {
        //   adjustColumnWidths(this.options.columns, width);
        // }
    };
    DataTable.prototype.onRowSelect = function (event) {
        this.state.setSelected(event);
        this.onSelectionChange.emit(event);
    };
    DataTable.prototype.showHeadFilter = function () {
        return this.options.showPageLimitOptions || this.options.showFiltering || this.options.showColumnOptions;
    };
    DataTable.prototype.showHideColumn = function (event) {
        this.options.columns[event.index].hide = event.column.hide ? false : true;
        // update local storage of hidden columns
        if (this.options.persistColumnOptions) {
            // array of column 'hides'
            var allColumnsHideOption_1 = [];
            this.options.columns.forEach(function (element) {
                allColumnsHideOption_1.push(element.hide);
            });
            // update item on local storge every time a column changes
            localStorage.setItem(this.options.persistColumnOptions, JSON.stringify(allColumnsHideOption_1));
        }
        this.onColumnChange.emit(event);
    };
    DataTable.prototype.resize = function () {
        this.adjustSizes();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableOptions_1.TableOptions)
    ], DataTable.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowsUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onSelectionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColumnChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onDataTableLengthChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onDataTableFilterChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onDataTableExportToolEvent", void 0);
    __decorate([
        core_1.ContentChildren(DataTableColumn_1.DataTableColumn), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "columns", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTable.prototype, "resize", null);
    DataTable = __decorate([
        core_1.Component({
            selector: 'datatable',
            providers: [State_1.StateService],
            template: "\n\n    <div *ngIf=\"showHeadFilter()\" datatable-header-filter \n      (onDataTableLengthChange)=\"onDataTableLengthChange.emit($event)\"\n      (onDataTableFilterChange)=\"onDataTableFilterChange.emit($event)\"\n      (onDataTableExportToolEvent)=\"onDataTableExportToolEvent.emit($event)\"\n      (onColumnChange)=\"showHideColumn($event)\"\n      ></div>\n\n    <table [className]=\"options.tableClasses\">\n      <thead datatable-header\n        (onColumnChange)=\"onColumnChange.emit($event)\">\n      </thead>\n\n      <tbody datatable-body\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"onRowSelect($event)\">\n      </tbody>\n      \n      <datatable-footer\n        (onPageChange)=\"state.setPage($event)\">\n      </datatable-footer>\n    </table>\n  "
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef, core_1.KeyValueDiffers])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=DataTable.js.map