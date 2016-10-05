/**
 * Returns the columns by pin.
 * @param {array} cols
 */
export declare function columnsByPin(cols: any): {
    left: any[];
    center: any[];
    right: any[];
};
/**
 * Returns the column options available.
 * @param {array} cols
 */
export declare function columnsOptions(cols: any): any[];
/**
 * Returns the widths of all group sets of a column
 * @param {object} groups
 * @param {array} all
 */
export declare function columnGroupWidths(groups: any, all: any): {
    left: number;
    center: number;
    right: number;
    total: number;
};
/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} prop width to get
 */
export declare function columnTotalWidth(columns: any, prop?: any): number;
