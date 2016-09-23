import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { translateXY } from '../../utils/translate';
import { StateService } from '../../services/State';

@Component({
  selector: 'tr[datatable-body-row]',
  template: `
        <td datatable-body-cell
          *ngFor="let column of state.columnsByPin.center"
          [row]="row"
          [column]="column"
          [className]="column.classes">
        </td>
  `
})
export class DataTableBodyRow {

  @Input() row: any;

  @HostBinding('class.active')
  get isSelected() {
    return this.state.selected &&
      this.state.selected.indexOf(this.row) > -1;
  }

  constructor(public state: StateService, element: ElementRef) {
    element.nativeElement.classList.add('datatable-body-row');
  }

  stylesByGroup(group) {
    console.log('BODYROW stylesByGroup()');
    const widths = this.state.columnGroupWidths;
    const offsetX = this.state.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.state.innerWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.state.scrollbarWidth) * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
