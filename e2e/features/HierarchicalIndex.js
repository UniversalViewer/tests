/**
 * Created by jenniferstrejevitch on 06/01/2015.
 */

var ViewerPage = require('./PageObjects/ViewerPage.js');

var HierarchicalIndex = function() {

    var ptor = protractor.browser;

    this.Given(/^The user is Viewing the books index$/, function (callback) {
        new ViewerPage()
            .contentsPanelIndexTab()
            .then(function (el){
                el.click().then(function () {
                    new ViewerPage()
                        .contentsPanelIndexTabActivated()
                        .then(function(){
                            callback();
                        },
                        function(){
                            callback.fail('Active Index tab not found');
                        });
                });
            });
    });

    this.Then(/^they see an expandable tree view$/, function (callback) {
        new ViewerPage()
            .contentsPanelIndexTabTreeExpansionToggles()
            .then(function(toggles) {
                if(toggles.length > 0) {
                    callback();
                } else {
                    callback.fail('Hierarchy not found (test found zero length array of toggle components)');
                }
            },
            function() {
                callback.fail('Hierarchy not found');
            }
        );
    });

    this.When(/^the user click on the expand view button$/, function (callback) {
        new ViewerPage()
            .contentsPanelIndexTabTreeExpansionToggles()
            .then(function (toggles){
                toggles[0].click().then(function () {
                   callback();
                });
            });
    });

    this.Then(/^the index appears indented$/, function (callback) {

        new ViewerPage()
            .contentsPanelIndexTabSubTrees()
            .then(function(uls){
                if(uls.length > 0) {
                    callback();
                } else {
                    callback.fail('Indentation not found (zero length list of ul components)');
                }}
                , function() {
                    callback.fail('Indentation not found');
                });

    });

};

module.exports = HierarchicalIndex;
