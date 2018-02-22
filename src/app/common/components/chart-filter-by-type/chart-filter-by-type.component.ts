import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../../models/user.model';
import { AppState } from '../../../models/app-state.model';
import { chartSeriesEnum } from '../../../models/enum/chart-series.enum';
import { enumToArray } from '../../utilities/helpers';


@Component({
  selector: 'app-chart-filter-by-type',
  templateUrl: './chart-filter-by-type.component.html',
  styleUrls: ['./chart-filter-by-type.component.scss'],
})
export class ChartFilterByTypeComponent implements OnInit {
  @Output() updateId: EventEmitter<any> = new EventEmitter();
  @Output() updateSeries: EventEmitter<any> = new EventEmitter();

  userDataState: Store<User>;

  currentAssetId = 0;
  currentAssetSeries = 'clicks';
  chartSeries: string[] = enumToArray(chartSeriesEnum);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.userDataState = this.store.select('state', 'user', 'data');
  }

  updateAssetId(arg) {
    this.updateId.emit(arg);
  }

  updateAssetSeries(arg) {
    this.updateSeries.emit(arg);
  }
}
