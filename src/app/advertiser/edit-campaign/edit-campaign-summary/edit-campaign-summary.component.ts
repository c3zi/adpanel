import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import 'rxjs/add/operator/first';

import { AppState } from 'models/app-state.model';
import { Campaign } from 'models/campaign.model';
import { campaignStatusesEnum } from 'models/enum/campaign.enum';
import { AdvertiserService } from 'advertiser/advertiser.service';
import { AssetHelpersService } from 'common/asset-helpers.service';
import { adStatusesEnum } from 'models/enum/ad.enum';
import * as advertiserActions from 'store/advertiser/advertiser.actions';
import { HandleSubscription } from 'common/handle-subscription';

@Component({
  selector: 'app-edit-campaign-summary',
  templateUrl: './edit-campaign-summary.component.html',
  styleUrls: ['./edit-campaign-summary.component.scss']
})
export class EditCampaignSummaryComponent extends HandleSubscription implements OnInit {
  campaign: Campaign;
  tooltipActive = false;
  currentTooltipIndex: number;

  constructor(
    private store: Store<AppState>,
    private advertiserService: AdvertiserService,
    private assetHelpers: AssetHelpersService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    const lastCampaignSubscription = this.store.select('state', 'advertiser', 'lastEditedCampaign')
      .subscribe((campaign: Campaign) => {
        this.assetHelpers.redirectIfNameNotFilled(campaign);
        this.campaign = campaign
      });
    this.subscriptions.push(lastCampaignSubscription);
  }

  saveCampaign(isDraft) {
    if (!isDraft) {
      this.campaign.basicInformation.status = campaignStatusesEnum.ACTIVE;
      this.campaign.ads.forEach((ad) => ad.status = adStatusesEnum.ACTIVE);
    }

    this.store.dispatch(new advertiserActions.AddCampaignToCampaigns(this.campaign));
    this.router.navigate(['/advertiser', 'dashboard']);
  }

  toggleTooltip(state, adIndex) {
    this.tooltipActive = state;
    this.currentTooltipIndex = adIndex;
  }
}
