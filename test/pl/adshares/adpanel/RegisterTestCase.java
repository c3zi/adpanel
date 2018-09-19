package pl.adshares.adpanel;

import pl.adshares.adpanel.enums.Properties;
import pl.adshares.adpanel.pages.LoginPage;
import pl.adshares.adpanel.pages.register.RegisterConfirmation;

import pl.adshares.adpanel.setup.BrowserTestCase;
import pl.adshares.adpanel.tools.RandomPage;
import pl.adshares.adpanel.tools.Structure;
import pl.adshares.adpanel.tools.Xml;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class RegisterTestCase extends BrowserTestCase {

  private RegisterPage registerPage;
  private RegisterConfirmation registerConfirmation;
  protected String loginAdService;
  protected String passwordAdService;
  protected String RandomsEmail;

  @BeforeTest
  public void setUp() {
    loginAdService = Xml.getValue(Structure.CONFIG_PROPERTIES, Properties.PROPERTY, Properties.EMAIL);
    passwordAdService = Xml.getValue(Structure.CONFIG_PROPERTIES, Properties.PROPERTY, Properties.PASSWORD);
  }

  @Test
  public void createAccount() {
    registerPage = new RegisterPage(driver);
    registerPage.createAccount(loginAdService, passwordAdService);
    registerConfirmation =new RegisterConfirmation(driver);
    registerConfirmation.registerConfirmation();
    registerConfirmation.succesRegistrationGoToLoginPage();
  }

  @Test
  public void registerPageObjectValidation() {
    registerPage = new RegisterPage(driver);
    registerPage.registerRequiredEmailValidation();
    registerPage.registerInvalidEmailValidation();
    registerPage.registerPasswordValidation();
    System.out.println("<-- Register Page Validation passed -->");
    registerConfirmation =new RegisterConfirmation(driver);
    registerConfirmation.registerConfirmation();
  }

  @Test
  public void registerPageCrossAccessWrongEmailCorrectPassword(){
    registerPage = new RegisterPage(driver);
    registerPage.wrongEmailCorrectPasswordRegister(passwordAdService);
    System.out.println("<-- Register Page: wrong Email & Correct Password scenerio passed -->");
  }

  @Test
  public void registerPageCrossAccessWrongPasswordCorrectEmail(){
    registerPage = new RegisterPage(driver);
    registerPage.wrongPasswordCorrectEmailRegister(loginAdService);
    System.out.println("<-- Register Page: Correct Email & wrong Password scenerio passed -->");
  }

  @Test
  public void registerPageCrossAccessWrongConfirmPasswordCorrectEmail(){
    registerPage = new RegisterPage(driver);
    registerPage.wrongConfirmPasswordCorrectEmailRegister(loginAdService,passwordAdService);
    System.out.println("<-- Register Page: Correct Email & wrong Password Confirm scenerio passed -->");
  }

  @Test
  public void registerForgotPassword() throws InterruptedException {
    registerPage = new RegisterPage(driver);
    registerPage.registerForgotPassword(RandomPage.getFromStore("user_email"),"ADS11ads");
  }
}