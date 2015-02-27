Feature: Embedding
  In order to embed the viewer in my own page
  As a Viewer user
  I must be able to see embedding options and use them to control how the viewer appears

Scenario: Booting the viewer using the metastrapper (no reset frame)
  Given the user is viewing a page with an embedded script link to the viewer
   Then the current page identifier says Front Cover
