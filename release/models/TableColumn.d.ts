import { PipeTransform } from '@angular/core';
/**
 * Default Column Options
 * @type {object}
 */
export declare class TableColumn {
    static getProps(): string[];
    $$id: string;
    isExpressive: boolean;
    frozenLeft: boolean;
    frozenRight: boolean;
    flexGrow: number;
    minWidth: number;
    maxWidth: number;
    width: number;
    resizeable: boolean;
    comparator: any;
    pipe: PipeTransform;
    sortable: boolean;
    sortPropOverride: string;
    draggable: boolean;
    canAutoResize: boolean;
    name: string;
    prop: string;
    template: any;
    headerTemplate: any;
    classes: string;
    hide: boolean;
    hideInColumnOptions: boolean;
    constructor(props?: any);
}
