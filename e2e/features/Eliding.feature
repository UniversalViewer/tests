Feature: Eliding
  In order to view an object's index more comfortably
  As a library user
  I want to be able to view the object's index in a way that handles long titles

  Scenario: Viewing index with a long title
    Given The user is Viewing the books index
    Then they see that a long title is elided appropriately
