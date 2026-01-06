Feature: Install

  Installation scenario example

  Background: 
    Given I navigate to relative url "/"

  @install @positive
  Scenario: Install
    Given I select language English
    When I click on language continue button
    Given I fill site title "test"
    Given I fill install username "test"
    Given I fill install password "test"
    Given I confirm weak password
    Given I fill install email "test@example.com"
    Given I discourage search engines
    When I click on install button
    Then I see installation message "Success!"
