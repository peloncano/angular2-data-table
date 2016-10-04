import { Component } from '@angular/core';

import {
  TableOptions,
  TableColumn,
  // ColumnMode
} from '../angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>basic</h3>
      <datatable
        class=''

        (onDataTableLengthChange)="changePageLimit($event)"
        (onDataTableFilterChange)="filterChanged($event)"
        (onDataTableExportToolEvent)="exportSomething($event)"
        [rows]='rows'
        [options]='options'>
      </datatable>
    </div>
  `
})
export class App {

  rows = [];

  options = new TableOptions({
    // columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    limit: 25,
    showFiltering: true,
    tableClasses: 'material',
    showPageLimitOptions: false,
    showColumnOptions: false,
    showExportingTool: true,
    columns: [
      new TableColumn({ prop: 'name', classes: 'HEY THIS IS NEW' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  changePageLimit(event) {
    console.log('CHANGING PAGE LIMIT', event);
  }

  filterChanged(event) {
    console.log('FILTER CHANGED', event);
  }

  exportSomething(event) {
    console.log('EXPORT SELECTED', event);
  }

}
