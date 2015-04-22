Feature: Thumbnails
  In order to browse through an image gallery easily
  As a Viewer user
  I want to be able to click through the items as thumbnails.

  Scenario: Viewing expanded thumbnails list
    Given the user is viewing the Viewer
    When they click in the expand arrow in the Thumbnails tab
    Then the list of thumbnails is expanded

  Scenario: Increasing thumbnails size
    Given the user is viewing the expanded thumbnails list
    When they click the Increase thumbnails size button
    Then the size of the Thumbnail is increased

  Scenario: Decreasing thumbnail size
    Given the user is viewing the expanded thumbnails list
    When they click the Decrease thumbnails size button
    Then the size of the Thumbnail is decreased

  Scenario: Contracting thumbnails list through arrow
    Given the user is viewing the expanded thumbnails list
    When they click on the collapse thumbails arrow
    Then the list of thumbnails is contracted

  Scenario: Contracting thumbnails list through thumbnail opening
    Given the user is viewing the expanded thumbnails list
    When they click on a thumbnail
    Then the list of thumbnails is contracted

  Scenario: Viewing thumbnails list
    Given the user is viewing the Viewer
    When they click in the Thumbnails tab
    Then a list of thumbnails is rendered to the user
