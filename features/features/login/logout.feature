Feature: Logout

  Logout scenario example

  Background: 
    Given I navigate to relative url "/wp-admin"

  @logout @priority-high @positive
  Scenario: Logout as test user
    Given I fill username "test"
    Given I fill password "test"
    When I click on login button
    When I hover on account menu in admin bar
    When I click on logout in account menu
    Then I see login form
