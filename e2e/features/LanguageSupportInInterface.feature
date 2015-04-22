Feature: Language Support In Interface
  In order to use the viewer in a particular language
  As a Viewer user
  I must be able to see the viewer interface in an appropriate language.

  Scenario: Viewer user examines CONTENTS panel from TestLanguage browser
    Given the user is viewing the Viewer in TestLanguage
     Then they see TestLanguage text for the CONTENTS panel header
      And they see TestLanguage text for the Thumbnails tab header
      And they see TestLanguage text for the Index tab header

  Scenario: Viewer user examines MORE INFORMATION panel from TestLanguage browser
    Given the user is viewing the Viewer in TestLanguage
     When the MORE INFORMATION panel is expanded
     Then they see TestLanguage text for the MORE INFORMATION panel header

  Scenario: Viewer user examines navigation panel from TestLanguage browser
    Given the user is viewing the Viewer in TestLanguage
     Then they see TestLanguage text for the Go button

  Scenario: Viewer user examines settings dialog from TestLanguage browser
    Given the user is viewing the Viewer in TestLanguage
     When they open the settings menu
     Then they see TestLanguage text for the settings menu header