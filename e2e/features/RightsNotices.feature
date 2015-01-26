Feature: Rights Notices
  In order to be advised about the rights of a work
  As a Viewer user
  I must be made aware of the rights and usage details of a work.

Scenario: Viewer user sees initial rights notice
  Given the user is viewing the Viewer
  Then a rights notice is shown on the main display

Scenario: Viewer user finds rights notice in More Information
  Given the user is viewing the Viewer
  When they click MORE INFORMATION
  Then a rights notice is shown within the More Information panel

