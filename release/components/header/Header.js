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
var DataTableHeader = (function () {
    function DataTableHeader(state, elm) {
        this.state = state;
        this.onColumnChange = new core_1.EventEmitter();
        elm.nativeElement.classList.add('datatable-header');
    }
    Object.defineProperty(DataTableHeader.prototype, "headerHeight", {
        // get headerWidth() {
        //   if(this.state.options.scrollbarH)
        //     return this.state.innerWidth + 'px';
        //   return '100%';
        // }
        get: function () {
            var height = this.state.options.headerHeight;
            if (height !== 'auto')
                return height + "px";
            return height;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeader.prototype, "onColumnChange", void 0);
    DataTableHeader = __decorate([
        core_1.Component({
            selector: 'thead[datatable-header]',
            template: "\n    <tr\n      [style.width]=\"state.columnGroupWidths.total + 'px'\"\n      class=\"datatable-header-inner\"\n      >\n\n      <th datatable-header-cell\n        *ngFor=\"let column of state.columnsByPin.center\"\n        [model]=\"column\"\n        (onColumnChange)=\"onColumnChange.emit($event)\">\n      </th>\n    </tr>\n  ",
            // template: `
            //   <tr
            //     [style.width]="state.columnGroupWidths.total + 'px'"
            //     class="datatable-header-inner"
            //     orderable
            //     (onReorder)="columnReordered($event)">
            //     <th datatable-header-cell
            //       *ngFor="let column of state.columnsByPin.center"
            //       long-press
            //       (onLongPress)="drag = true"
            //       (onLongPressEnd)="drag = false"
            //       draggable
            //       [dragX]="column.draggable && drag"
            //       [dragY]="false"
            //       [model]="column"
            //       (onColumnChange)="onColumnChange.emit($event)">
            //     </th>
            //   </tr>
            // `,
            host: {
                // '[style.width]': 'headerWidth',
                '[style.height]': 'headerHeight'
            }
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef])
    ], DataTableHeader);
    return DataTableHeader;
}());
exports.DataTableHeader = DataTableHeader;
//# sourceMappingURL=Header.js.map