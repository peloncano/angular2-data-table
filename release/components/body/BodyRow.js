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
// import { translateXY } from '../../utils/translate';
var State_1 = require('../../services/State');
var DataTableBodyRow = (function () {
    // @HostBinding('class.active')
    // get isSelected() {
    //   return this.state.selected &&
    //     this.state.selected.indexOf(this.row) > -1;
    // }
    function DataTableBodyRow(state, element) {
        this.state = state;
        element.nativeElement.classList.add('datatable-body-row');
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "row", void 0);
    DataTableBodyRow = __decorate([
        core_1.Component({
            selector: 'tr[datatable-body-row]',
            template: "\n        <td datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          [row]=\"row\"\n          [column]=\"column\"\n          [className]=\"column.classes\">\n        </td>\n  "
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef])
    ], DataTableBodyRow);
    return DataTableBodyRow;
}());
exports.DataTableBodyRow = DataTableBodyRow;
//# sourceMappingURL=BodyRow.js.map