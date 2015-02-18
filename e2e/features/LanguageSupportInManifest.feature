Feature: Language Support In Manifest
  In order to use the viewer in a particular language
  As a Viewer user
  I must be able to see items reflected in the manifest in an appropriate language.

  Scenario: Viewer user examines CONTENTS panel thumbnail items from English browser
    Given the user is viewing the Viewer in English
     Then they see English text for the selected thumbnail title
      And they see English text for the current page identifier

  Scenario: Viewer user examines CONTENTS panel index items from English browser
    Given the user is viewing the Viewer in English
     When the user is viewing the CONTENTS panel INDEX tab
     Then they see English text for the selected item in the hierarchical index

  Scenario: Viewer user examines MORE INFORMATION panel items from English browser
    Given the user is viewing the Viewer in English
     Then they see English text for the metadata labels
      And they see English text for the metadata values

  Scenario: Viewer user examines page identifier from English browser
    Given the user is viewing the Viewer in English
     Then they see English text for the page identifier

  Scenario: Viewer user examines work title from English browser
    Given the user is viewing the Viewer in English
     Then they see English text for the work title

  Scenario: Viewer user examines attribution from English browser
    Given the user is viewing the Viewer in English
     Then they see English text for the attribution notice

