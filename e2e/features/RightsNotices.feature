Feature: Rights Notices
  In order to be advised about the rights of a work
  As a Viewer user
  I must be made aware of the rights and usage details of a work.

Scenario: Viewer user sees initial rights notice
  Given the user is viewing the Viewer
   Then a rights notice is shown on the main display

Scenario: Viewer clicks More toggle in initial rights notice
  Given the user is viewing the Viewer
    And the partial text of the initial rights notice is displayed and recorded
   When they click the More button in the initial rights notice
   Then the full text of the initial rights notice is displayed

Scenario: Viewer clicks Less toggle on initial rights notice
  Given the user is viewing the Viewer
    And they have clicked on the More button in the initial rights notice
    And the full text of the initial rights notice is displayed and recorded
   When they click the Less button in the initial rights notice
   Then the partial text of the initial rights notice is displayed

Scenario: Viewer user sees rights notice in More Information panel
  Given the user is viewing the Viewer
   When they click MORE INFORMATION
   Then a rights notice is shown within the More Information panel

Scenario: Viewer clicks More toggle in More Information panel rights notice
  Given the user is viewing the Viewer
   When they click MORE INFORMATION
    And the partial text of the MORE INFORMATION panel rights notice is displayed and recorded
    And they click the More button in the MORE INFORMATION panel rights notice
   Then the full text of the MORE INFORMATION panel rights notice is displayed

Scenario: Viewer clicks Less toggle in More Information panel rights notice
  Given the user is viewing the Viewer
    And they have clicked MORE INFORMATION
    And they have clicked the More button in the MORE INFORMATION panel rights notice
    And the full text of the MORE INFORMATION panel rights notice is displayed and recorded
   When they click the Less button in the MORE INFORMATION panel rights notice
   Then the partial text of the MORE INFORMATION panel rights notice is displayed

