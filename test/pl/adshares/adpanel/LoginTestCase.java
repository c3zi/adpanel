package pl.adshares.adpanel;

import pl.adshares.adpanel.enums.Properties;
import pl.adshares.adpanel.pages.DashboardPopup;
import pl.adshares.adpanel.pages.HeaderBarPage;
import pl.adshares.adpanel.pages.LoginPage;
import pl.adshares.adpanel.setup.BrowserTestCase;
import pl.adshares.adpanel.tools.Structure;
import pl.adshares.adpanel.tools.Xml;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class LoginTestCase extends BrowserTestCase {

  private LoginPage loginPage;
  private DashboardPopup dashboardPopup;
  private HeaderBarPage headerBarPage;
  protected String loginAdService;
  protected String passwordAdService;

  @BeforeTest
  public void setUp() {

    loginAdService = Xml.getValue(Structure.CONFIG_PROPERTIES, Properties.PROPERTY, Properties.EMAIL);
    passwordAdService = Xml.getValue(Structure.CONFIG_PROPERTIES, Properties.PROPERTY, Properties.PASSWORD);
  }

  @Test
  public void loginTest() {
    loginPage = new LoginPage(driver);
    loginPage.pageLayoutValidation();
    loginPage.loginSignIn(loginAdService, passwordAdService);
  }

  @Test
  public void popUpPublisher(){
    dashboardPopup = new DashboardPopup(driver);
    dashboardPopup.popUpPublisher();
  }
    @Test
  public void popUpAdvertiser(){
      dashboardPopup = new pl.adshares.adpanel.pages.DashboardPopup(driver);
      dashboardPopup.popUpAdvertiser();
  }


  @Test
  public void firstLoginPopUp() {
    dashboardPopup = new pl.adshares.adpanel.pages.DashboardPopup(driver);
    dashboardPopup.chooseAccountTypeAllTypes();
  }

  @Test
  public void loginPageObjectValidation() {
    loginPage = new LoginPage(driver);
    loginPage.loginRequiredEmailValidation();
    loginPage.loginInvalidEmailValidation();
    loginPage.loginPasswordValidation();
    System.out.println("<-- Login Page Validation passed -->");
  }

  @Test
  public void loginPageCrossAccessValidation() {
    loginPage = new LoginPage(driver);
    loginPage.wrongEmailCorrectPassword(passwordAdService);
    System.out.println("<-- Login Page: wrong Email & Correct Password scenerio passed -->");
    driver.navigate().refresh();
    loginPage.wrongPasswordCorrectEmail(loginAdService);
    System.out.println("<-- Login Page: Correct Email & wrong Password scenerio passed -->");
  }

  @Test
  public void registerTest() {
    loginPage = new LoginPage(driver);
    loginPage.pageLayoutValidation();
    loginPage.goToRegistration();
  }

  @Test
  public void logOutTest() {
    headerBarPage = new HeaderBarPage(driver);
    headerBarPage.logOut();
    loginPage = new pl.adshares.adpanel.pages.LoginPage(driver);
    loginPage.pageLayoutValidation();
  }
}
