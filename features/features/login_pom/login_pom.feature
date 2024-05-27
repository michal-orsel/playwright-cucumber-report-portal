Feature: Login - POM

  Login scenario example using page object model

  @login @priority-high @positive
  Scenario: Login as test user - POM
    When I log in:
      | Field    | Value |
      | Username | test  |
      | Password | test  |
    Then I am logged in
