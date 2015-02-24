Feature: Metadata
  In order to find basic information about the image
  As a Viewer user
  I want to be able to see the basic metadata associated with the digitised item.

  Scenario: Viewing metadata from digitised asset
    Given the user is viewing the Viewer
    When they click MORE INFORMATION
    Then metadata key/value pairs are displayed to the user

  Scenario: Accessing metadata side panel
    Given the user is viewing the Viewer
    Then the metadata side panel is visible to the user

  Scenario: Hyperlinks are visible in metadata
    Given the user is viewing the Viewer
     When they click MORE INFORMATION
     Then they can see a hyperlink in the LICENSE field