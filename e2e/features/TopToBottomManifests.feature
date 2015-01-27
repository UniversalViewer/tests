Feature: Top To Bottom Manifests
  In order to browse through a top to bottom manifest
  As a Viewer user
  I want to be able to see pages from a top to bottom manifest correctly presented.

  Scenario: Viewing a top to bottom manifest - first page thumbnail is correct
    Given the user is viewing the Viewer
    Then the first thumbnail of a top to bottom manifest is selected

  Scenario: Viewing a top to bottom manifest - displaying two up pages thumbnails are correct
    Given the user is viewing the Viewer
    And the Viewer is on full screen mode
    When they click the Next arrow button
    Then the second and third thumbnails of a top to bottom manifest are selected
    And the second and third thumbnails of a top to bottom manifest are arranged correctly

  Scenario: Viewing a top to bottom manifest in one-up mode - behaviour of next button is correct
    Given the user is viewing the Viewer on page 1r
    And the Viewer is in one-up mode
    When they click the Next arrow button
    Then the content of the page 1v is displayed to the user
