Feature: Downloading
  In order to use the viewer download features
  As a Viewer user
  I must be able to see and use the downloading options

#Scenario: Inspecting the downloading options
#  Given the user is viewing the Viewer
#   When they choose to see the downloading options
#   Then the downloading options are displayed

Scenario: Inspecting external content
  Given the user is viewing the Viewer
   When they choose to see the downloading options
   Then they see external content displayed in an overlay
