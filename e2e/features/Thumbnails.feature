Feature: In order to browse through an image galery easily
         As a Viewer user
         I want to be able to click through the items as thumbnails.


  Scenario: Viewing thumbnails list
    Given The user is viewing the Viewer
    When they click the "Next" arrow button "thumbnails" tab
    Then a list of thumbnails is rendered to the user

  Scenario: Opening digitised page through thumbnail
    Given The user is viewing the Viewer
    And they are viewing a list of thumbnails
    When they click on a thumbnail
    Then the corresponding image is loaded in the main Viewer


