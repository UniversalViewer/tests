Feature: Zoom
  In order to view high quality images of digitised items in great detail
  As a Viewer user
  I want to be able to zoom an image in and out at any level

  Scenario: Zooming in
    Given the user is viewing the Viewer
      And the current zoom level is recorded
     When they click zoom in button
     Then the current zoom level has increased

  Scenario: Zooming out
    Given the user is viewing the Viewer
      And the current zoom level is recorded
     When they click zoom out button
     Then the current zoom level has decreased

#  Scenario: Panning image
#    Given the user is viewing the Viewer
#    And the image is zoomed
#    When the user press the mouse and drag the image to the right
#    Then that part of the image moves to the right