import { Given, When, Then, Before } from "@cucumber/cucumber"
import { fixture } from "../../support/fixture";
import { LoginPom } from "../../../pom/login_pom"

let loginPom: LoginPom;

When('I log in:', async function (dataTable) {
  let data = dataTable.rowsHash();  

  loginPom = new LoginPom(fixture.page);
  await loginPom.goto();
  await loginPom.getStarted();

  await loginPom.login({
    "username": data["Username"],
    "password": data["Password"]
  });
});

Then('I am logged in', async function () {
  await loginPom.noLoginErrorsPresent();
});



