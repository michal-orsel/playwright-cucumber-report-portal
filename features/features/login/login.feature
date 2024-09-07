Feature: Login

  Login scenarios examples

  Background: 
    Given I navigate to relative url "/wp-admin"

  @login @priority-high @positive
  Scenario: Login as test user
    Given I fill username "test"
    Given I fill password "test"
    When I click on login button
    Then I see account menu
    Then I see username "test" in account menu

  @login @priority-high @positive
  Scenario: Login as test user - failing scenario to see attachements in Report Portal
    Given I fill username "test"
    Given I fill password "wrong password"
    When I click on login button
    Then I see account menu
    Then I see username "test" in account menu

  @login @priority-high @negative
  Scenario: Login with wrong password
    Given I fill username "test"
    Given I fill password "wrong password"
    When I click on login button
    Then I see login error message "Error: The password you entered for the username test is incorrect. Lost your password?"

  @login @priority-high @negative @wip
  Scenario: Login with wrong password - wip - excluding test from execution verification
    Given I fill username "test"
    Given I fill password "wrong password"
    When I click on login button
    Then I see login error message "Error: The password you entered for the username test is incorrect. Lost your password?"

  @login @priority-high @negative @manual
  Scenario: Login with wrong password - manual - excluding test from execution verification
    Given I fill username "test"
    Given I fill password "wrong password"
    When I click on login button
    Then I see login error message "Error: The password you entered for the username test is incorrect. Lost your password?"

  @login @priority-high @negative
  Scenario: Login with non existing user
    Given I fill username "non existing user"
    Given I fill password "password"
    When I click on login button
    Then I see login error message "Error: The username non existing user is not registered on this site. If you are unsure of your username, try your email address instead."

  @login @priority-high @positive
  Scenario Outline: Login as test user - parameters - 50 - with one failing to see how does it looks like Report Portal
    Given I fill username "<username>"
    Given I fill password "<password>"
    When I click on login button
    Then I see account menu
    Examples: 
      | username | password       |
      | test     | test           |
      | test     | test           |
      | test     | test           |
  