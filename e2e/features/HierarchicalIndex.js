/**
 * Created by jenniferstrejevitch on 06/01/2015.
 */
var HierarchicalIndex = function() {
    var ptor;

    this.Before(function (callback) {
        console.log('HierarchicalIndex.js Before');
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        callback();
    });

    this.Given(/^The user is Viewing the books index$/, function (callback) {
        ptor.findElement(protractor.By.css('.leftPanel .main .tab.first'))
            .then(function (el){
                el.click().then(function () {
                    ptor.findElement(protractor.By.css('.tab.first.on'))
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
        ptor.findElements(protractor.By.css('.treeView .tree li'))
            .then(function(lis){
                lis[0].findElement(protractor.By.css('.toggle'))
                    .then(function(){
                        callback();
                    },
                function(){
                    callback.fail('Hierarchy not found');
                });
            });
    });

    this.When(/^the user click on the expand view button$/, function (callback) {
        ptor.findElements(protractor.By.css('.treeView .tree li .toggle'))
            .then(function (el){
                el[0].click().then(function () {
                   callback();
                });
            });
    });

    this.Then(/^the index appears indented$/, function (callback) {
        ptor.findElements(protractor.By.css('.treeView .tree li'))
            .then(function(lis){
                lis[1].findElement(protractor.By.css('ul'))
                    .then(function(){
                        callback();
                    },
                    function(){
                        callback.fail('indentation not found');
                    });
            });
    });

};

module.exports = HierarchicalIndex;
