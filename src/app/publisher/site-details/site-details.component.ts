import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { ChartService } from 'common/chart.service';
import { PublisherService } from 'publisher/publisher.service';
import { HandleSubscription } from 'common/handle-subscription';
import { AppState } from 'models/app-state.model';
import { Site, SiteLanguage } from 'models/site.model';
import { ChartFilterSettings } from 'models/chart/chart-filter-settings.model';
import { ChartLabels } from 'models/chart/chart-labels.model';
import { ChartData } from 'models/chart/chart-data.model';
import { AssetTargeting, TargetingOption } from 'models/targeting-option.model';
import { createInitialArray, enumToArray } from 'common/utilities/helpers';
import { chartSeriesEnum } from 'models/enum/chart.enum';
import { siteStatusEnum } from 'models/enum/site.enum';
import { ErrorResponseDialogComponent } from "common/dialog/error-response-dialog/error-response-dialog.component";
import * as PublisherActions from 'store/publisher/publisher.actions';

import { parseTargetingOptionsToArray, prepareTargetingChoices } from 'common/components/targeting/targeting.helpers';
import { MatDialog } from "@angular/material";
import { UserConfirmResponseDialogComponent } from "common/dialog/user-confirm-response-dialog/user-confirm-response-dialog.component";
import * as codes from "common/utilities/codes";

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent extends HandleSubscription implements OnInit {
  site: Site;
  siteStatusEnum = siteStatusEnum;
  language: SiteLanguage;

  ObjectKeys = Object.keys;
  filtering: AssetTargeting = {
    requires: [],
    excludes: []
  };

  chartSeries: string[] = enumToArray(chartSeriesEnum);

  barChartValue: number;
  barChartDifference: number;
  barChartDifferenceInPercentage: number;
  barChartLabels: ChartLabels[] = createInitialArray({labels: []}, 6);
  barChartData: ChartData[][] = createInitialArray([{data: []}], 6);

  currentChartFilterSettings: ChartFilterSettings;
  filteringOptions: TargetingOption[];

  constructor(
    private route: ActivatedRoute,
    private publisherService: PublisherService,
    private router: Router,
    private store: Store<AppState>,
    private chartService: ChartService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.site = this.route.snapshot.data.site;
    this.getLanguages();
    const chartFilterSubscription = this.store.select('state', 'common', 'chartFilterSettings')
      .subscribe((chartFilterSettings: ChartFilterSettings) => {
        this.currentChartFilterSettings = chartFilterSettings;
      });
    this.subscriptions.push(chartFilterSubscription);

    this.getChartData(this.currentChartFilterSettings);
    this.getFilteringFiltering();
  }

  deleteSite() {
    const dialogRef = this.dialog.open(UserConfirmResponseDialogComponent, {
      data: {
        message: 'Do you confirm deletion?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.publisherService.deleteSite(this.site.id)
            .subscribe(
              () => {
                this.router.navigate(['/publisher', 'dashboard']);
              },
              (err) => {
                if (err.status !== codes.HTTP_INTERNAL_SERVER_ERROR) {
                  this.dialog.open(ErrorResponseDialogComponent, {
                    data: {
                      title: `Site cannot be deleted`,
                      message: `Given site (${this.site.id}) cannot be deleted at this moment. Please try again, later`,
                    }
                  });
                }
              }
            );
        }
      },
      () => {}
    );
  }

  getLanguages() {
    this.store.select('state', 'publisher', 'languagesList')
      .subscribe((languagesList) => {
        this.language = languagesList.find(lang => lang.code === this.site.primaryLanguage);

        if (!languagesList.length) {
          this.store.dispatch(new PublisherActions.GetLanguagesList());
        }
      });
  }

  getFilteringFiltering() {
    this.store.select('state', 'publisher', 'filteringCriteria')
      .subscribe((filteringOptions) => {
        this.filteringOptions = filteringOptions;
        this.filtering = parseTargetingOptionsToArray(this.site.filtering, this.filteringOptions);
        if (!filteringOptions.length) {
          this.store.dispatch(new PublisherActions.GetFilteringCriteria());
        }
      });
  }

  getChartData(chartFilterSettings) {
    this.barChartData.forEach(values => values[0].data = []);

    const chartDataSubscription = this.chartService
      .getAssetChartDataForPublisher(
        chartFilterSettings.currentFrom,
        chartFilterSettings.currentTo,
        chartFilterSettings.currentFrequency,
        chartFilterSettings.currentAssetId
      )
      .subscribe(data => {
        this.barChartData.forEach(values => values[0].data = data[0].values);
        this.barChartLabels.forEach(chartLabels => {
          chartLabels.labels = data[0].timestamps.map(timestamp => moment(timestamp).format('D'));
        });
        this.barChartValue = data[0].total;
        this.barChartDifference = data[0].difference;
        this.barChartDifferenceInPercentage = data[0].differenceInPercentage;
      });

    this.subscriptions.push(chartDataSubscription);
  }

  navigateToEditSite(path: string, step: number): void {
    this.store.dispatch(new PublisherActions.SetLastEditedSite(this.site));
    this.router.navigate(
      ['/publisher', 'edit-site', path],
      {queryParams: {step, summary: true}}
    );
  }

  navigateToCreateAdUnits() {
    this.store.dispatch(new PublisherActions.SetLastEditedSite(this.site));
    this.router.navigate(
      ['/publisher', 'edit-site', 'create-ad-units'],
      {queryParams: {step: 3, summary: true}}
    );
  }

  onSiteStatusChange(status) {
    const statusActive = status !== this.siteStatusEnum.ACTIVE;

    this.site.status =
      statusActive ? this.siteStatusEnum.ACTIVE : this.siteStatusEnum.INACTIVE;

    this.publisherService.updateSiteData(this.site.id, this.site).subscribe(
      () => {
      },
      (err) => {
        if (err.status === codes.HTTP_INTERNAL_SERVER_ERROR) return;
        this.dialog.open(ErrorResponseDialogComponent, {
          data: {
            title: 'Ups! Something went wrong...',
            message: `We weren\'t able to save your site due to this error: ${err.error.message} \n Please try again later.`,
          }
        });
      }
    );
  }
}
