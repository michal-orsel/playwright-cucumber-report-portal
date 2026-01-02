import { Page, BrowserContext, Expect } from "@playwright/test"

export const fixture = {
    browserContext: undefined as BrowserContext | undefined,
    expect: undefined as Expect | undefined,
    page: undefined as Page | undefined
}