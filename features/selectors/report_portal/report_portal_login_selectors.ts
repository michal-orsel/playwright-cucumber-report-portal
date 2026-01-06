export const reportPortalLoginSelectors = {
    usernameInput: 'input[name="login"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
} as const;

export const reportPortalNavigationSelectors = {
    breadcrumbs: 'li[class*="pageBreadcrumbs__page-breadcrumbs-item"] span',
    userAvatar: 'img[class*="userBlock__avatar"]',
    menuitem: 'div[class*="userBlock__menu"] a',
} as const;

export const reportPortalProfileSelectors = {
    navigationTabLink: 'div[class*=navigationTabs__tabs-wrapper] a',
    apiKeyNameInput: 'form[class*="generateApiKeyModal"] input',
    generateButtonInModal: 'button[class*="bigButton__color-booger"]'
} as const;

export const reportPortalGenerateApiKeyModalSelectors = {
    loaderBlock: 'div[class*="loaderBlock"]',
    generatedKeyInput: 'div[class*="apiKeyGeneratedModal__input"] input[readonly]',
} as const;




