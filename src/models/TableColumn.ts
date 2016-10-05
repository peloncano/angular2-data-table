import { PipeTransform } from '@angular/core';
import { id } from '../utils/id';
import { camelCase } from '../utils/camelCase';

/**
 * Default Column Options
 * @type {object}
 */
export class TableColumn {

  static getProps() {
    let props = ['name', 'prop'];
    let col = new TableColumn();

    for(const prop in col) {
      props.push(prop);
    }

    return props;
  }

  // unique id
  $$id: string = id();

  // defines if its expressive
  isExpressive: boolean = false;

  // pinned to the left
  frozenLeft: boolean = false;

  // pinned to the right
  frozenRight: boolean = false;

  // The grow factor relative to other columns. Same as the flex-grow
  // API from http =//www.w3.org/TR/css3-flexbox/. Basically;
  // take any available extra width and distribute it proportionally
  // according to all columns' flexGrow values.
  flexGrow: number = 0;

  // Minimum width of the column.
  minWidth: number = 0;

  // Maximum width of the column.
  maxWidth: number = undefined;

  // The width of the column; by default (in pixels).
  width: number = 150;

  // If yes then the column can be resized; otherwise it cannot.
  resizeable: boolean = true;

  // Custom sort comparator
  comparator: any = undefined;

  // Custom pipe
  pipe: PipeTransform = null;

  // If yes then the column can be sorted.
  sortable: boolean = true;

  // can column be dragged
  draggable: boolean = true;

  // Whether the column can automatically resize to fill space in the table.
  canAutoResize: boolean = true;

  // column name / label
  name: string;

  // property to bind to on the row
  prop: string;

  // ng2 template ref
  template: any;

  // ng2 template ref
  headerTemplate: any;

  // Classes to apply to the column
  classes: string = '';

  // Hide the column from the table - but should be available in column options
  hide: boolean = false;

  // Hide the column from column options - column will be available in the table
  hideInColumnOptions: boolean = false;

  constructor(props?: any) {
    Object.assign(this, props);

    if(!this.prop && this.name) {
      this.prop = camelCase(this.name);
    }
  }

}
