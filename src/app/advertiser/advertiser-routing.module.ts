import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvertiserComponent } from './advertiser.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { EditCampaignBasicInformationComponent } from './edit-campaign/edit-campaign-basic-info/edit-campaign-basic-information.component';
import { EditCampaignAdditionalTargetingComponent } from './edit-campaign/edit-campaign-additional-targeting/edit-campaign-additional-targeting.component';
import { EditCampaignCreateAdsComponent } from './edit-campaign/edit-campaign-create-ads/edit-campaign-create-ads.component';
import { EditCampaignSummaryComponent } from './edit-campaign/edit-campaign-summary/edit-campaign-summary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { AdvertiserGuard } from './advertiser-guard.service';
import { CampaignResolver } from './resolvers/campaign.resolver';
import { TargetingCriteriaResolver } from './resolvers/targeting-criteria.resolver';

const advertiserRoutes: Routes = [
  {
    path: 'advertiser',
    component: AdvertiserComponent,
    canActivate: [AdvertiserGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/advertiser/dashboard'},
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'campaign/:id',
        component: CampaignDetailsComponent,
        resolve: {
          targetingOptions: TargetingCriteriaResolver,
          campaign: CampaignResolver
        }
      },
      {
        path: 'create-campaign',
        component: EditCampaignComponent,
        resolve: {targetingOptions: TargetingCriteriaResolver},
        children: [
          {
            path: 'basic-information',
            component: EditCampaignBasicInformationComponent,
          },
          {
            path: 'additional-targeting',
            component: EditCampaignAdditionalTargetingComponent,
          },
          {
            path: 'create-ad',
            component: EditCampaignCreateAdsComponent,
          },
          {
            path: 'summary',
            component: EditCampaignSummaryComponent
          }
        ]
      },
      {
        path: 'edit-campaign/:id',
        component: EditCampaignComponent,
        resolve: {
          targetingOptions: TargetingCriteriaResolver,
          campaign: CampaignResolver,
        },
        children: [
          {
            path: 'basic-information',
            component: EditCampaignBasicInformationComponent,
          },
          {
            path: 'additional-targeting',
            component: EditCampaignAdditionalTargetingComponent,
          },
          {
            path: 'create-ad',
            component: EditCampaignCreateAdsComponent,
          },
          {
            path: 'summary',
            component: EditCampaignSummaryComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(advertiserRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdvertiserRoutingModule {
}
