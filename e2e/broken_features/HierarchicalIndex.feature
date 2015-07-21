Feature: Hierarchical Index
  In order to better view understand an objects index
  As a library user
  I want to be able to view the object's index in a hierarchical display

  Scenario: Viewing index
    Given the user is Viewing the books index
    Then they see an expandable tree view

  Scenario: Viewing index hierarchy
    Given the user is Viewing the books index
    When the user click on the expand view button
    Then the index appears indented

  Scenario: Viewing deep hierarchy
    Given the user is Viewing the books index
    When the user expands the whole hierarchy
    Then they see no more expand view buttons