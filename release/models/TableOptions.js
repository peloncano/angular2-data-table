"use strict";
var ColumnMode_1 = require('../enums/ColumnMode');
var SortType_1 = require('../enums/SortType');
var TableOptions = (function () {
    function TableOptions(props) {
        // Columns
        this.columns = [];
        // Enable vertical scrollbars
        this.scrollbarV = false;
        // Enable horz scrollbars
        this.scrollbarH = false;
        // The row height; which is necessary
        // to calculate the height for the lazy rendering.
        this.rowHeight = 30;
        // flex
        // force
        // standard
        this.columnMode = ColumnMode_1.ColumnMode.standard;
        // Loading message presented when the array is undefined
        this.loadingMessage = 'Loading...';
        // Message to show when array is presented
        // but contains no values
        this.emptyMessage = 'No data to display';
        // The minimum header height in pixels.
        // pass falsey for no header
        // note: number|string does not work right
        this.headerHeight = 30;
        // The minimum footer height in pixels.
        // pass falsey for no footer
        this.footerHeight = 0;
        // if external paging is turned on
        this.externalPaging = false;
        // Page size
        this.limit = undefined;
        // Total count
        this.count = 0;
        // Page offset
        this.offset = 0;
        // Loading indicator
        this.loadingIndicator = false;
        // if you can reorder columns
        this.reorderable = true;
        // type of sorting
        this.sortType = SortType_1.SortType.single;
        // sorts
        this.sorts = [];
        // Table classes
        this.tableClasses = '';
        // Page Limit options
        this.showPageLimitOptions = true;
        // Default page limits options
        this.pageLimits = [10, 25, 50, 100];
        // default page limit
        this.defaultPageLimit = 50;
        // filtering search
        this.showFiltering = true;
        // filterting tooltip
        this.showFilteringTooltip = false;
        // fitlerting tooltip Message
        this.filteringTooltipText = 'Searching highlighted columns';
        // filter delay in milliseconds
        this.tableFilterDelay = 300;
        // filter minimun characters
        this.tableFilterMinLength = 3;
        // column options
        this.showColumnOptions = true;
        // string to persist column options for this table
        this.persistColumnOptions = null;
        // column options
        this.showExportingTool = true;
        this.exportingTools = [
            {
                type: 'csv',
                label: 'CSV',
                class: 'button_csv'
            },
            {
                type: 'print',
                label: 'Print',
                class: 'button_print'
            },
            {
                type: 'copy',
                label: 'Copy',
                class: 'button_copy'
            }
        ];
        Object.assign(this, props);
    }
    return TableOptions;
}());
exports.TableOptions = TableOptions;
//# sourceMappingURL=TableOptions.js.map