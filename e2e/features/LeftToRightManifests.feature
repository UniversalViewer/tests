Feature: Left To Right Manifests
  In order to browse through a left to right manifest
  As a Viewer user
  I want to be able to see pages from a left to right manifest correctly presented.

Scenario: Viewing a left to right manifest - first page thumbnail is correct
  Given the user is viewing the Viewer
   Then the first thumbnail of a left to right manifest is selected
    And the first thumbnail of a left to right manifest is arranged correctly

Scenario: Viewing a right to left manifest - displaying two up pages thumbnails are correct
  Given the user is viewing the Viewer
    And the Viewer is on full screen mode
   When they click the Next arrow button
   Then the second and third thumbnails of a left to right manifest are selected
    And the second and third thumbnails of a left to right manifest are arranged correctly

Scenario: Viewing a left to right manifest in one-up mode - behaviour of next button is correct
  Given the user is viewing the Viewer on page 1
    And the Viewer is in one-up mode
   When they click the Next arrow button
   Then the content of the page 2 is displayed to the user
