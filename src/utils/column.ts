/**
 * Returns the columns by pin.
 * @param {array} cols
 */
export function columnsByPin(cols) {
  let ret = {
    left: [],
    center: [],
    right: []
  };

  if(cols) {
    for(let col of cols) {

      if(col.hide) {
        continue;
      }

      if(col.frozenLeft) {
        ret.left.push(col);
      } else if(col.frozenRight) {
        ret.right.push(col);
      } else {
        ret.center.push(col);
      }
    }
  }

  return ret;
}

/**
 * Returns the column options available.
 * @param {array} cols
 */
export function columnsOptions(cols) {
  let ret = [];

  if(cols) {

    for(let i = 0; i < cols.length; i++) {
    
      let col = cols[i];

      if(col.hideInColumnOptions) {
        continue;
      }
      // Using this to keep track of the column's index in the options array
      // For dealing with those columns that were hidden from the column options
      col._index = i;
      
      ret.push(col);

    }
  }

  return ret;
}

/**
 * Returns the widths of all group sets of a column
 * @param {object} groups
 * @param {array} all
 */
export function columnGroupWidths(groups, all) {
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: columnTotalWidth(all)
  };
}

/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} prop width to get
 */
export function columnTotalWidth(columns, prop?) {
  let totalWidth = 0;

  if(columns) {
    for(let c of columns) {
      let has = prop && c[prop];
      totalWidth = totalWidth + (has ? c[prop] : c.width);
    }
  }

  return totalWidth;
}
