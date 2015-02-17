Feature: Language Specific Characters
  In order to use the viewer in a particular language
  As a Viewer user
  I must be able to see language specific characters correctly.

  Scenario: Viewer user can see special characters
    Given the user is viewing the Viewer in Welsh
     When they choose to see the embedding options
     Then they see Welsh characters in the embedding options content
