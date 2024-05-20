Feature: navigationBar
  Background:
  Given I am on the login page
  And I fill in my email and password with username and password

  Scenario: Navigate to the Feature Navigation Bar
  Given I am on the home page
  When click on the Account Activity Nav
  Then I should see theAccount Activity content