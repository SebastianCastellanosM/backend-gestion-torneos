Feature: Create tournament

  Scenario: Admin creates a tournament
    Given the server is running
    When I send a POST request to \/api\/tournaments with name, category and rules
    Then the response should be 201