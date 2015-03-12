Feature: Toggle View Mode
  In order to have a good reading experience
  As a Viewer user
  I want to be able to switch between reading one and two pages at the same time.

Scenario: Switching from two page view to one page view
  Given the user is viewing the Viewer on page 1
    And the Viewer is in two-up mode
   When they click the paging toggle button
   Then one page is displayed to the user
    And the paging toggle button shows two-up icon

Scenario: Switching from one page view to two page view
  Given the user is viewing the Viewer on page 1
    And the Viewer is in one-up mode
   When they click the paging toggle button
   Then two pages are displayed to the user
    And the paging toggle button shows one-up icon