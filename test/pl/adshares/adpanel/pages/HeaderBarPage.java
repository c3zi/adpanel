package pl.adshares.adpanel.pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HeaderBarPage {

  @FindBy(css = "div[data-test='header-toggle-settings-menu']")                                                         private WebElement headerSettingsMenu;
  @FindBy(css = "[data-test='header-log-out-button']")                                                              private WebElement logOut;
  @FindBy(css = "li[data-test='header-account-settings-button']")                                                       private WebElement accountSettingsButton;
  @FindBy(css = "li[data-test='header-billing-payments-button']")                                                       private WebElement billingPaymentsButton;
  @FindBy(css = "[data-test='header-toggle-settings-menu']")                                                            private WebElement SettingsMenu;
  @FindBy(xpath = "//*[@class='adsh-icon adsh-icon--small adsh-icon--append settings-menu-chevron']")                   private WebElement SettingsMenuChevron;
  @FindBy(css = "[data-test='header-log-out-button']")                                                                  private WebElement SettingsLogOut;

  private WebDriver driver;
  private WebDriverWait wait;

  public HeaderBarPage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 30);
    PageFactory.initElements(driver, this);
  }

  public void logOut() {
    if(!driver.findElements(By.xpath("//*[@class='adsh-icon adsh-icon--small adsh-icon--append settings-menu-chevron']")).isEmpty()){
      wait.until(ExpectedConditions.elementToBeClickable(SettingsMenuChevron));
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      SettingsMenuChevron.click();
      wait.until(ExpectedConditions.elementToBeClickable(SettingsLogOut));
      SettingsLogOut.click();
      System.out.println("Click - SettingsLogOut");
    }else{
      logOut.click();
      System.out.println("Click - logOut");
    }
  }

  public void goToGeneralSettings() {
    headerSettingsMenu.click();
    wait.until(ExpectedConditions.visibilityOf(accountSettingsButton));
    accountSettingsButton.click();
  }

  public void goToBillingPayments() {
    headerSettingsMenu.click();
    wait.until(ExpectedConditions.visibilityOf(billingPaymentsButton));
    billingPaymentsButton.click();
  }


}
