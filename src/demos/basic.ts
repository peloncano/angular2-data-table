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
    showFilteringTooltip: true,
    filteringTooltipText: 'searching highlighted',
    tableClasses: 'material',
    showPageLimitOptions: false,
    showColumnOptions: true,
    showExportingTool: false,
    persistColumnOptions: "basic-test-table",
    columns: [
      new TableColumn({ name: 'Check ALL', hideInColumnOptions: true, prop: 'name', classes: 'HEY THIS IS NEW' }),
      new TableColumn({ name: 'Name', prop: 'name', classes: 'HEY THIS IS NEW' }),
      new TableColumn({ name: 'Gender', hide: true }),
      new TableColumn({ name: 'Company' }),
      new TableColumn({ name: 'Actions', hide: true, hideInColumnOptions: true, prop: 'name' })
    ]
  });

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
    });

    // setTimeout(() => {
    //     console.log("CHANGING SOMETHING");
    //     // this.options.columns[1].hide = true;

    //     const clone = new TableColumn({ name: 'Gender', hide:true });

    //     this.options.columns[1] = clone;
    //   }, 5000);
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
