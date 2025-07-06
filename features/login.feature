Feature: User login

  Scenario: Successful login
    Given the server is running
    When I send a POST request to \/api\/users\/login with correct credentials
    Then the response should be 200
    And the response body should contain a token

  Scenario: Failed login with wrong password
    Given the server is running
    When I send a POST request to \/api\/users\/login with wrong password
    Then the response should be 401
