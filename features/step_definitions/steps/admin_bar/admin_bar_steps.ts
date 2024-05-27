import { Given, When, Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { fixture } from "../../support/fixture";
import { adminBarSelectors } from "../../../selectors/admin_bar/admin_bar_selectors";

When('I hover on account menu in admin bar', async function () {
    await fixture.page.locator(adminBarSelectors.accountMenuLink).hover();
});

Then('I see account menu', async function () {
    await expect(fixture.page.locator(adminBarSelectors.accountMenuLink)).toBeVisible();
});

Then('I see username {string} in account menu', async function (expectedName) {
    await expect(fixture.page.locator(adminBarSelectors.accountMenuUserText)).toHaveText(expectedName);
});
