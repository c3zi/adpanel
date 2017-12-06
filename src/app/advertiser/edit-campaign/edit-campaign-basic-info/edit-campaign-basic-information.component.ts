import { Component, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AdvertiserActions from '../../store/advertiser.actions';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-edit-campaign-basic-information',
  templateUrl: './edit-campaign-basic-information.component.html',
  styleUrls: ['./edit-campaign-basic-information.component.scss'],
})
export class EditCampaignBasicInformationComponent {
  @ViewChild('editCampaignBasicInformationForm') editCampaignBasicInformationForm: NgForm;
  dateStart = new FormControl();
  dateEnd = new FormControl();
  minDate = moment().format('L')
  maxDate = moment().add(1, 'year').format('L')

  goesToSummary: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.route.queryParams.subscribe(params => {
      this.goesToSummary = params.summary;
    });
  };

  saveBasicInformation() {
    if (!this.editCampaignBasicInformationForm.valid) {
      // return
    }

    const basicInformation = {
      name: this.editCampaignBasicInformationForm.value.campaignName,
      targetURL: this.editCampaignBasicInformationForm.value.campaignTargetURL,
      bidStrategy: this.editCampaignBasicInformationForm.value.campaignBidStrategy,
      bidValue: this.editCampaignBasicInformationForm.value.campaignBidValue,
      budget: this.editCampaignBasicInformationForm.value.campaignBudget,
      dateStart: moment(this.dateStart.value._d).format('L'),
      dateEnd: moment(this.dateEnd.value._d).format('L') || null,
    };

    this.store.dispatch(new AdvertiserActions.SaveBasicInformation(basicInformation));

    const link = this.goesToSummary ? '/advertiser/create-campaign/summary' : '/advertiser/create-campaign/additional-targeting';
    const param = this.goesToSummary ? 4 : 2;

    this.router.navigate([link, { step: param }]);
  }
}
