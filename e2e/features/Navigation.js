

var Navigation = function() {
    //this.World = require("../support/world.js").World; // overwrite default World constructor
    //var viewer = require("../support/viewer.js");
    var ptor;

    this.Before(function (callback) {
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function () {
            callback();
        });
        //new Viewer()
        //    .get()
        //    .then(function() {callback();});
    });

    this.After(function(done){
        browser.ignoreSynchronization = true;
        ptor.switchTo().defaultContent();
        done();
    });


    this.Given(/^the user is viewing the Viewer on page (\d+)$/, function (arg1, callback) {
        console.log('Given the user is viewing the Viewer on page ' + arg1 + ' - Navigation.js');

        ptor.findElement(protractor.By.css('.searchText'))
            .then(
            function (searchText) {
                console.log('searchText: ' + searchText);
                searchText.clear();
                searchText.sendKeys(arg1);
                ptor.findElement(protractor.By.css('.imageBtn.go'))
                    .then(
                    function (go) {
                        go.click()
                            .then(
                            function() {
                                console.log('switched to default content');
                                callback();
                            },
                            function() {
                                callback.fail('Could not click in button GO');
                            }
                        );
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

    this.When(/^they click the Next arrow button$/, function (callback) {
        console.log('When they click the Next arrow button - Navigation.js');

        ptor.findElement(protractor.By.css('.imageBtn.next'))
            .then(
            function(next){
                next.click();
                callback();
            },
            function(){
                callback.fail("button next not found");
            }
        );
    });

    this.When(/^they click the Previous arrow button$/, function (callback) {
        console.log('When they click the Previous arrow button - Navigation.js');

            ptor.findElement(protractor.By.css('.imageBtn.prev'))
                .then(
                function (prev) {
                    prev.click();
                    callback();
                },
                function () {
                    callback.fail("button next not found");
                }
            );
    });

    this.Then(/^the content of the page (\d+) is displayed to the user$/, function (arg1, done) {
        console.log('Then the content of the page "' + arg1 + '" is displayed to the user - Navigation.js');

            ptor.findElements(protractor.By.css('.thumb.selected .label'))
                .then(function (labels) {
                    var label = labels[0];
                    label.getText()
                    .then(function (labelText) {
                        console.log('labelText:' + labelText);
                        labelText = labelText.trim();
                        if(labelText == arg1)
                            done();
                        else
                            done.fail("Expected labelText(" + labelText + ") to be equal arg1(" + arg1 + ")");
                    },
                    function (err) {
                        console.log("problems");
                        done(err);
                    });
                },
                function () {
                    done.fail("incorrect page label");
                });

    });

    //TODO: Assert that Viewer is on full screen
    this.Given(/^the Viewer is on full screen mode$/, function (callback) {
        console.log('Given the Viewer is on full screen mode - Navigation.js');

        ptor.findElement(protractor.By.css('.imageBtn.fullScreen'))
            .then(
            function (fs) {
                fs.click();
                console.log('clicked on full screen button');
                callback();
            },
            function () {
                callback();
            });
    });

    this.Given(/^the user is viewing the Viewer on its very first page$/, function (callback) {
        console.log('Given the user is viewing the Viewer on its very first page - Navigation.js');

        ptor.findElement(protractor.By.css('.imageBtn.first')).then(
            function(fs){
                fs.click();
                callback();
            },
            function(){
                callback.fail("Full screen option not found");
            }
        );
    });

    this.Then(/^the Previous arrow button is disabled$/, function (done) {
        console.log('Then the Previous arrow button is disabled - Navigation.js');

        ptor.findElement(protractor.By.css('.imageBtn.prev.disabled'))
            .then(function(){
               ptor.findElement(protractor.By.css('.paging.btn.prev.disabled'))
                   .then(
                   function(){
                       done();
                   },
                   function(){
                       done.fail('Canvas previous page arrow should be disabled');
                   });
            },
            function() {
                done.fail('Previous button should be disabled');
            });
    });

    this.Given(/^the user is viewing the Viewer in its last page$/, function (callback) {
        console.log('Given the user is viewing the Viewer in its last page - Navigation.js');

            ptor.findElement(protractor.By.css('.imageBtn.last'))
                .then(
                function (go) {
                    go.click();
                    callback();
                },
                function () {
                    callback.fail("button last page not found");
                });
    });

    this.Then(/^the Next arrow is disabled$/, function (done) {
        console.log('Then the Next arrow is disabled - Navigation.js');

        ptor.findElement(protractor.By.css('.imageBtn.next.disabled'))
            .then(function(){
                ptor.findElement(protractor.By.css('.paging.btn.next.disabled'))
                    .then(
                    function(){
                        done();
                    },
                    function(){
                        done.fail('Canvas previous page arrow should be disabled');
                    });
            },
            function() {
                done.fail('Previous button should be disabled');
            });
    });

    //this.Given(/^the user is viewing the Viewer$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});

    this.When(/^they go to the page (\d+)$/, function (arg1, callback) {
        console.log('When they go to the page "'+ arg1 + '" - Navigation.js');

            ptor.findElement(protractor.By.css('.searchText'))
                .then(
                function (searchText) {
                    console.log('searchText: ' + searchText);
                    searchText.clear();
                    searchText.sendKeys(arg1);
                    ptor.findElement(protractor.By.css('.imageBtn.go')).then(
                        function (go) {
                            go.click();
                            callback();
                        },
                        function () {
                            callback.fail("button go not found");
                        }
                    )
                },
                function () {
                    callback.fail("page search text box not found");
                });
    });

    this.Then(/^the image is labeled with page (\d+)$/, function (arg1, callback) {
        console.log('Then the image is labeled with page "'+ arg1 + '" - Navigation.js');

            ptor.findElement(protractor.By.css('.thumb.selected .label'))
                .then(
                function (label) {
                    label.getText().then(function(labelText){
                        if(labelText.substring(0,2) == arg1){
                            callback();
                        }else{
                            callback.fail("incorrect page label")
                        }

                    });

                },
                function () {
                    callback.fail("ino label found");
                });
    });

};

module.exports = Navigation;