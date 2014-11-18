

var Navigation = function() {
    //this.World = require("../support/world.js").World; // overwrite default World constructor
    //require("chai-as-promissed");
    var ptor;

    this.Before(function (callback) {
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        callback();
    });

    this.Given(/^the user is viewing the Viewer on page (\d+)$/, function (arg1, callback) {
        console.log('Given the user is viewing the Viewer on page ' + arg1 + ' - Navigation.js');
        //ptor.close();
        //ptor.get('/examples/monograph.html').then(function () {
         this.switchToViewerFrame();
            ptor.sleep(3000).then(function () {

                console.log('Given - switched to frame .');
                ptor.findElement(protractor.By.css('.searchText')).then(
                    function (searchText) {
                        console.log('searchText: ' + searchText);
                        searchText.clear();
                        searchText.sendKeys(arg1);
                        ptor.findElement(protractor.By.css('.imageBtn.go')).then(
                            function (go) {
                                go.click();
                                ptor.switchTo().defaultContent();
                                console.log('switched to default content');
                                callback();
                            },
                            function () {
                                callback.fail("button go not found");
                            }
                        )
                    },
                    function () {
                        callback.fail("page search text box not found");
                    }
                );
            });
        //});
    });

    this.When(/^they click the Next arrow button$/, function (callback) {
        console.log('When they click the Next arrow button - Navigation.js');
        this.switchToViewerFrame();
        ptor.findElement(protractor.By.css('.imageBtn.next')).then(
            function(next){
                next.click();
                ptor.switchTo().defaultContent();
                callback();
            },
            function(){
                callback.fail("button next not found");
            }
        );
    });

    this.When(/^they click the Previous arrow button$/, function (callback) {
        console.log('When they click the Previous arrow button - Navigation.js');
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.imageBtn.prev')).then(
                function (prev) {
                    prev.click();
                    ptor.switchTo().defaultContent();
                    callback();
                },
                function () {
                    callback.fail("button next not found");
                }
            );
        });
    });

    this.Then(/^the content of the page (\d+) is displayed to the user$/, function (arg1, callback) {
        console.log('Then the content of the page "'+ arg1 + '" is displayed to the user - Navigation.js');
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.thumb.selected .label')).then(
                function (label) {
                    //expect(label.getText()).toContain('13');
                    //ptor.switchTo().defaultContent();
                    //callback();
                    label.getText().then(function(labelText){
                        if(labelText.substring(0,2) == arg1){
                            ptor.switchTo().defaultContent();
                            callback();
                        }else{
                            callback.fail("incorrect page label")
                        }
                        //console.log('Then label:' + labelText + 'k');
                        //assert.include(labelText,'13','pass');
                        //ptor.switchTo().defaultContent();
                        //callback();
                    });

                },
                function () {
                    callback.fail("incorrect page label");
                }
            );
        });
    });

    //TODO: Assert that Viewer is on full screen
    this.Given(/^the Viewer is on full screen mode$/, function (callback) {
        console.log('Given the Viewer is on full screen mode - Navigation.js');
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.imageBtn.fullScreen')).then(
                function (fs) {
                    fs.click();
                    console.log('clicked on full screen button');
                    callback();

                },
                function () {
                    callback();


                });
        });
    });

    this.Given(/^the user is viewing the Viewer on its very first page$/, function (callback) {
        console.log('Given the user is viewing the Viewer on its very first page - Navigation.js');
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
        ptor.findElement(protractor.By.css('.imageBtn.first')).then(
            function(fs){
                fs.click();
                ptor.switchTo().defaultContent();
                callback();
            },
            function(){
                callback.fail("Full screen option not found");
            }
        )
        });
    });

    this.Then(/^the Previous arrow button is disabled$/, function (callback) {
        console.log('Then the Previous arrow button is disabled - Navigation.js');
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the user is viewing the Viewer in its last page$/, function (callback) {
        console.log('Given the user is viewing the Viewer in its last page - Navigation.js');
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.imageBtn.last')).then(
                function (go) {
                    go.click();
                    ptor.switchTo().defaultContent();
                    callback();
                },
                function () {
                    callback.fail("button last page not found");
                }
            );
        });
    });

    this.Then(/^the Next arrow is disabled$/, function (callback) {
        console.log('Then the Next arrow is disabled - Navigation.js');
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    //this.Given(/^the user is viewing the Viewer$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});

    this.When(/^they go to the page (\d+)$/, function (arg1, callback) {
        console.log('When they go to the page "'+ arg1 + '" - Navigation.js');
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.searchText')).then(
                function (searchText) {
                    console.log('searchText: ' + searchText);
                    searchText.clear();
                    searchText.sendKeys(arg1);
                    ptor.findElement(protractor.By.css('.imageBtn.go')).then(
                        function (go) {
                            go.click();
                            ptor.switchTo().defaultContent();
                            callback();
                        },
                        function () {
                            callback.fail("button go not found");
                        }
                    )
                },
                function () {
                    callback.fail("page search text box not found");
                }
            );
        });
    });

    this.Then(/^the image is labeled with page (\d+)$/, function (arg1, callback) {
        console.log('Then the image is labeled with page "'+ arg1 + '" - Navigation.js');
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.thumb.selected .label')).then(
                function (label) {
                    label.getText().then(function(labelText){
                        if(labelText.substring(0,2) == arg1){
                            ptor.switchTo().defaultContent();
                            callback();
                        }else{
                            callback.fail("incorrect page label")
                        }

                    });

                },
                function () {
                    callback.fail("ino label found");
                }
            )
        });
    });
};

module.exports = Navigation;