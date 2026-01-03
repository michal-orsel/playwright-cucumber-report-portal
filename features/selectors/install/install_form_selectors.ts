export const installSelectors = {
    // Language selection page
    languageEnglishOption: 'option[value=""][lang="en"]',
    languageContinueButton: 'input[type="submit"]',
    
    // Installation form
    siteTitleInput: '#weblog_title',
    usernameInput: '#user_login',
    passwordInput: '#pass1',
    confirmWeakPasswordCheckbox: 'input.pw-checkbox',
    emailInput: '#admin_email',
    searchEngineVisibilityCheckbox: '#blog_public',
    installButton: '#submit',
    
    // Success page
    successHeading: 'h1',
} as const;
