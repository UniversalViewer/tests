Feature: Right To Left Manifests
  In order to browse through a right to left manifest
  As a Viewer user
  I want to be able to see pages from a right to left manifest correctly presented.

Scenario: Viewing a right to left manifest - first page thumbnail is correct
  Given the user is viewing the Viewer
   Then the first thumbnail of a right to left manifest is selected
    And the first thumbnail of a right to left manifest is arranged correctly

Scenario: Viewing a right to left manifest - displaying two up pages thumbnails are correct
  Given the user is viewing the Viewer
    And the Viewer is in full screen mode
   When they click the Next arrow button
   Then the second and third thumbnails of a right to left manifest are selected
    And the second and third thumbnails of a right to left manifest are arranged correctly

Scenario: Viewing a right to left manifest in one-up mode - behaviour of next button is correct
  Given the user is viewing the Viewer on page 1r
    And the Viewer is in one-up mode
   When they click the Next arrow button
   Then the content of the page 1v is displayed to the user
