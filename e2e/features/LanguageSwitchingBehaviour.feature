Feature: Language Switching Behaviour
  In order to use the viewer in a particular language
  As a Viewer user
  I must be able to switch language and continue working.

#Scenario: Viewer user switches language while on an advanced page
#  Given the user is viewing the Viewer in English on page 2
#   When they switch to the TestLanguage language
#   Then the content of the page 2 is displayed to the user

Scenario: Viewer user switches language while the metadata panel is open
  Given the user is viewing the Viewer in English
    And the Viewer is on full screen mode
    And the MORE INFORMATION panel is visible
   When they change language to TestLanguage
   Then the metadata side panel is visible to the user
