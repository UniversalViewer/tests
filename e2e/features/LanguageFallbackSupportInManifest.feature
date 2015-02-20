Feature: Language Fallback Support In Manifest
  In order to use the viewer in a particular language
  As a Viewer user
  I must be able to see items reflected in the manifest in an appropriate language, falling back where necessary.

  Scenario: Viewer user examines CONTENTS panel thumbnail items from Welsh browser
    Given the user is viewing the Viewer in Welsh
     When the Viewer is in full screen mode
     Then they see English text for the selected thumbnail title
      And they see English text for the current page identifier

  Scenario: Viewer user examines CONTENTS panel index items from Welsh browser
    Given the user is viewing the Viewer in Welsh
      When the user is viewing the CONTENTS panel INDEX tab
       And the Viewer is in full screen mode
     Then they see English text for the selected item in the hierarchical index

  Scenario: Viewer user examines MORE INFORMATION panel items from Welsh browser
    Given the user is viewing the Viewer in Welsh
     When the MORE INFORMATION panel is visible
      And the Viewer is in full screen mode
     Then they see English text for the metadata label named description
      And they see English text for the metadata value named description

  Scenario: Viewer user examines work title from Welsh browser
    Given the user is viewing the Viewer in Welsh
     When the Viewer is in full screen mode
     Then they see English text for the work title

  Scenario: Viewer user examines attribution from Welsh browser
    Given the user is viewing the Viewer in Welsh
     When the Viewer is in full screen mode
     Then they see English text for the attribution notice