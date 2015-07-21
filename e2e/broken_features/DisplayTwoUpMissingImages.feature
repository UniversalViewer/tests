Feature: Display Two Up Missing Images
  In order to have a more authentic book reading experience
  As a Viewer user
  I want to be able to view two pages at the same time.

  Scenario: Viewing two pages in a canvas
    Given the user is viewing the Viewer on its very first page
    When they click the Next arrow button
    Then a pop up is displayed to the user