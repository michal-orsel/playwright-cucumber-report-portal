import { Given, When, Then } from "@cucumber/cucumber"
import { fixture } from "../../support/fixture";
import { accountMenuSelectors } from "../../../selectors/admin_bar/account_menu_selectors";

When('I click on logout in account menu', async function () {
    await fixture.page.locator(accountMenuSelectors.logoutButton).click();
});
