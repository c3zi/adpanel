import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from "@angular/material";
import 'rxjs/add/operator/take';
import { Observable } from "rxjs";
import {
  map,
  startWith
} from "rxjs/operators";
import { AppState } from 'models/app-state.model';
import {
  SaveLastEditedSite,
  UpdateSite
} from 'store/publisher/publisher.actions';
import { cloneDeep } from 'common/utilities/helpers';
import { siteInitialState } from 'models/initial-state/site';
import { Site, SiteLanguage } from 'models/site.model';
import { PublisherService } from "publisher/publisher.service";
import { ErrorResponseDialogComponent } from "common/dialog/error-response-dialog/error-response-dialog.component";
import { HandleSubscription } from "common/handle-subscription";

@Component({
  selector: 'app-edit-site-basic-information',
  templateUrl: './edit-site-basic-information.component.html',
  styleUrls: ['./edit-site-basic-information.component.scss']
})
export class EditSiteBasicInformationComponent extends HandleSubscription implements OnInit {
  siteBasicInfoForm: FormGroup;
  languages: SiteLanguage[];
  siteBasicInfoSubmitted = false;
  site: Site = cloneDeep(siteInitialState);
  createSiteMode: boolean;
  filteredOptions: Observable<object>;
  changesSaved: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private publisherService: PublisherService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.createSiteMode = !!this.router.url.match('/create-site/');
    this.getLanguages();
    this.createForm();

    this.filteredOptions = this.siteBasicInfoForm.get('primaryLanguage').valueChanges
      .pipe(
        startWith(''),
        map((value: string | SiteLanguage) => typeof value === 'string' ? value : value.name),
        map((val: string) => val ? this.filterOptions(val) : this.languages.slice())
      )
  }

  getLanguages() {
    const languageListSubscription = this.store.select('state', 'publisher', 'languagesList')
      .first()
      .subscribe((languagesList) => {
        this.languages = languagesList;
      });
    this.subscriptions.push(languageListSubscription);
  }

  onSubmit() {
    this.siteBasicInfoSubmitted = true;
    return this.createSiteMode ? this.saveSiteBasicInformation() : this.updateSite();
  }

  onStepBack(): void {
    this.createSiteMode ? this.router.navigate(['/publisher', 'dashboard']) :
      this.router.navigate(['/publisher', 'site', this.site.id]);
  }

  saveSiteBasicInformation() {
    if (!this.siteBasicInfoForm.valid) {
      return;
    }

    this.adjustSiteDataBeforeSave();
    this.store.dispatch(new SaveLastEditedSite(this.site));
    this.changesSaved = true;
    this.router.navigate(
      ['/publisher', 'create-site', 'additional-filtering'],
      {queryParams: {step: 2}}
    );
  }

  adjustSiteDataBeforeSave(): void {
    let chosenLanguage = this.siteBasicInfoForm.controls['primaryLanguage'].value;

    if (typeof chosenLanguage === 'string') {
      chosenLanguage = this.getSiteInitialLanguage(chosenLanguage)
    }

    if (!chosenLanguage) {
      this.dialog.open(ErrorResponseDialogComponent, {
        data: {
          title: 'Invalid site language!',
          message: `Fill site language field with correct data and submit`,
        }
      });
      return;
    }

    this.site = {
      ...this.site,
      name: this.siteBasicInfoForm.controls['name'].value,
      primaryLanguage: typeof  chosenLanguage === 'object' ? chosenLanguage.code : chosenLanguage,
    };
  }

  updateSite(): void {
    if (!this.siteBasicInfoForm.valid) {
      return;
    }
    this.changesSaved = true;
    this.adjustSiteDataBeforeSave();
    this.store.dispatch(new UpdateSite(this.site));
  }

  createForm(): void {
    this.siteBasicInfoForm = new FormGroup({
      name: new FormControl(siteInitialState.name, Validators.required),
      primaryLanguage: new FormControl(siteInitialState.primaryLanguage, Validators.required)
    });
    this.getFormDataFromStore();
  }

  getFormDataFromStore(): void {
    const lastEditedSiteSubscription = this.store.select('state', 'publisher', 'lastEditedSite')
      .take(1)
      .subscribe((lastEditedSite) => {
        this.site = cloneDeep(lastEditedSite);
        this.site.primaryLanguage = lastEditedSite.primaryLanguage ?
          this.getSiteInitialLanguage(lastEditedSite.primaryLanguage) :
          this.getSiteInitialLanguage();
        this.siteBasicInfoForm.patchValue(this.site);
      });
    this.subscriptions.push(lastEditedSiteSubscription);
  }

  getSiteInitialLanguage(languageCode?: string | SiteLanguage): SiteLanguage {
    let data;
    if (languageCode) {
      data = typeof languageCode === 'string' ? languageCode : languageCode.code;
    } else {
      data = navigator.language.split('-')[0];
    }

    data = data.toLowerCase();

    return this.languages.find(lang => lang.code.toLowerCase() === data || lang.name.toLowerCase() === data);
  }

  displayOption(language?): string {
    return language ? language.name : ''
  }

  filterOptions(val: string): object[] {
    const filterValue = val.toLowerCase();
    return this.languages.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue))
  }
}
