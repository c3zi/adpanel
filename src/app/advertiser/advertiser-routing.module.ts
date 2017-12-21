import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertiserComponent } from './advertiser.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { EditCampaignBasicInformationComponent } from './edit-campaign/edit-campaign-basic-info/edit-campaign-basic-information.component';
import { EditCampaignAdditionalTargetingComponent } from './edit-campaign/edit-campaign-additional-targeting/edit-campaign-additional-targeting.component';
import { EditCampaignCreateAdsComponent } from './edit-campaign/edit-campaign-create-ads/edit-campaign-create-ads.component';
import { EditCampaignSummaryComponent } from './edit-campaign/edit-campaign-summary/edit-campaign-summary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { AdvertiserGuard } from './advertiser-guard.service';
import { TargetingCriteriaResolver } from '../common/resolvers/targeting-criteria.resolver';

const advertiserRoutes: Routes = [
  {
    path: 'advertiser',
    component: AdvertiserComponent,
    canActivate: [AdvertiserGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/advertiser/dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'campaign/:id', component: CampaignDetailsComponent},
      {
        path: 'create-campaign',
        component: EditCampaignComponent,
        children: [
          { path: 'basic-information', component: EditCampaignBasicInformationComponent },
          {
            path: 'additional-targeting',
            component: EditCampaignAdditionalTargetingComponent,
            resolve: { targetingOptions: TargetingCriteriaResolver }
          },
          { path: 'create-ad', component: EditCampaignCreateAdsComponent },
          { path: 'summary', component: EditCampaignSummaryComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(advertiserRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdvertiserRoutingModule { }
