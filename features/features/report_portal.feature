Feature: Report Portal - setup api key

  Report Portal - create api key and save into report portal and mcp configs

  Background: 
    Given I navigate to "http://localhost:8080"

  @report-portal-setup-api-key @positive
  Scenario: Report Portal - get api key
    Given I wait for login page to load in report portal
    Given I fill username "superadmin" in report portal
    Given I fill password "erebus" in report portal
    When I click on login button in report portal
    When I click on user avatar in report portal
    When I click on menu item "Profile" in report portal
    When I click on navigation tab link "API keys" in report portal
    When I click on generate API key button in report portal
    When I fill API key name "auto" in report portal
    When I click on generate button in modal in report portal
    Then I see generated API key in report portal
    Then I save the API key to report portal config
    Then I save the API key to mcp config
