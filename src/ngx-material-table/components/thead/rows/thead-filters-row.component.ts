import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import { Column } from "../../../lib/data-set/column";

@Component({
  selector: '[ng2-st-thead-filters-row]',
  template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th ng2-st-add-button *ngIf="showActionColumnLeft"
                          [grid]="grid"
                          (create)="create.emit($event)">
    </th>
    <th *ngFor="let column of grid.getColumns()" class="ngx-material-th {{ column.id }}">
      <ngx-material-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
                              (filter)="filter.emit($event)">
      </ngx-material-table-filter>
    </th>
    <th ng2-st-add-button *ngIf="showActionColumnRight"
                          [grid]="grid"
                          [source]="source"
                          (create)="create.emit($event)">
    </th>
  `,
})
export class TheadFitlersRowComponent implements OnChanges {

  @Input() grid: Grid;
  @Input() source: DataSource;

  @Output() create = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();

  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  filterInputClass: string;

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.filterInputClass = this.grid.getSetting('filter.inputClass');
  }
}
