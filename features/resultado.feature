Feature: Record match results

  Scenario: Admin records a match result
    Given the server is running
    When I send a POST request to "/api/matches/results" with match stats
    Then the response should be 200