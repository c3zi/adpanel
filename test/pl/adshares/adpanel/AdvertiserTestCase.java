package pl.adshares.adpanel;

import pl.adshares.adpanel.pages.DashboardPopup;
import pl.adshares.adpanel.pages.advertiser.*;
import pl.adshares.adpanel.pages.LoginPage;
import pl.adshares.adpanel.setup.BrowserTestCase;
import org.testng.annotations.Test;

public class AdvertiserTestCase extends BrowserTestCase {

  private LoginPage loginPage;
  private AdvertiserMainPage advertiserMainPage;
  private DashboardPopup dashboardPopup;

  @Test
  public void createAdvertiserCampaign() {
    advertiserMainPage = new AdvertiserMainPage(driver);
    advertiserMainPage.createCampaign();
    advertiserMainPage.createCampaignSaveData();
    advertiserMainPage.createCampaignAdditionalTargeting();
    advertiserMainPage.createCampaignAdditionalTargetingSaveData();
    advertiserMainPage.createCampaignCreateAds();
    advertiserMainPage.createCampaignCreateAdsSaveData();
    advertiserMainPage.createCampaignSummary();
    advertiserMainPage.createCampaignSummaryStartCampaignButton();
    }
  @Test
  public void backAdvertiserCampaign() {
    advertiserMainPage = new AdvertiserMainPage(driver);
    advertiserMainPage.createCampaign();
    advertiserMainPage.createCampaignSaveData();
    advertiserMainPage.createCampaignAdditionalTargeting();
    advertiserMainPage.createCampaignAdditionalTargetingSaveData();
    advertiserMainPage.createCampaignCreateAds();
    advertiserMainPage.createCampaignCreateAdsSaveData();
    advertiserMainPage.createCampaignSummary();
    advertiserMainPage.createCampaignSummaryGoBack();
    advertiserMainPage.createCampaignCreateAdsGoBack();
    advertiserMainPage.createCampaignAdditionalTargetingGoBack();
    advertiserMainPage.createCampaignGoBack();
  }
  @Test
  public void saveAsDraftAdvertiserCampaign() {
    advertiserMainPage = new AdvertiserMainPage(driver);
    advertiserMainPage.createCampaign();
    advertiserMainPage.createCampaignSaveData();
    advertiserMainPage.createCampaignAdditionalTargeting();
    advertiserMainPage.createCampaignAdditionalTargetingSaveDataAsDraft();

    advertiserMainPage.createCampaignCreateAds();
    advertiserMainPage.createCampaignCreateAdsSaveData();
    advertiserMainPage.createCampaignSummary();
    advertiserMainPage.createCampaignSummaryGoBack();
    advertiserMainPage.createCampaignCreateAdsGoBack();
    advertiserMainPage.createCampaignAdditionalTargetingGoBack();
    advertiserMainPage.createCampaignGoBack();
  }
  @Test
  public void saveBasicInformationAdvertiserCampaign() {
    advertiserMainPage = new AdvertiserMainPage(driver);
    advertiserMainPage.createCampaign();
    advertiserMainPage.createCampaignSaveData();
  }
  @Test
  public void backBasicInformationAdvertiserCampaign() {
    advertiserMainPage = new AdvertiserMainPage(driver);
    advertiserMainPage.createCampaign();
    advertiserMainPage.createCampaignGoBack();
  }
  @Test
  public void saveAdditionalTargetingCampaign() {
    advertiserMainPage = new AdvertiserMainPage(driver);
    advertiserMainPage.createCampaign();
    advertiserMainPage.createCampaignSaveData();
    advertiserMainPage.createCampaignAdditionalTargeting();
    advertiserMainPage.createCampaignAdditionalTargetingSaveData();
  }
  @Test
  public void advertiserCampaign() {
    advertiserMainPage = new AdvertiserMainPage(driver);
    advertiserMainPage.advertiserMyCampaign();
  }
}
