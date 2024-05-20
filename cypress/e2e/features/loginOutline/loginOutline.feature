Feature: Login Outline

  @test
  Scenario Outline: Login with valid credentials
    Given I am on the login page
    When I fill in my email and password with <user> and <pass>
    Then I should validate that I am not logged in
    Examples:
      | user | pass     |
      | user | password |
      | user | pass     |
      | user | pass     |
      | user | pass     |
      | user | pass     |