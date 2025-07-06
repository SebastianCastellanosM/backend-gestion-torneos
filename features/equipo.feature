Feature: Team registration

  Scenario: Register a team with valid data
   Given the server is running
    When I send a POST request to \/api\/teams\/register with team name and players
    Then the response should be 201
