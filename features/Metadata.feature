Feature: In order to find basic information about the image
         As a Viewer user
         I want to be able to see the basic metadata associated with the digitised item.


  Scenario: Viewing metadata from digitised asset
    Given The user is viewing the Viewer
    When they click "View metadata"
    Then metadata key/value pairs are displayed to the user

  Scenario: Accessing metadata side panel
    Given The user is viewing the Viewer
    Then the metadata side panel is visible to the user
