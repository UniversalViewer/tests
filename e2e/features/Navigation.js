

var Navigation = function() {
    //require("chai-as-promissed");
    var ptor;

    this.Before(function (callback) {
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        callback();
    });

    this.Given(/^the user is viewing the Viewer on page (\d+)$/, function (arg1, callback) {
        //ptor.get('/examples/monograph.html').then(function(){
            this.switchToViewerFrame();
            console.log('Given - switched to frame ');
            ptor.findElement(protractor.By.css('.searchText')).then(
                function(searchText){
                    console.log('searchText: ' + searchText);
                    searchText.sendKeys('12');
                    ptor.findElement(protractor.By.css('.imageBtn.go')).then(
                        function(go){
                            go.click();
                            ptor.switchTo().defaultContent();
                            callback();
                        },
                        function(){
                            callback.fail("button go not found");
                        }
                    )
                },
                function(){
                    callback.fail("page search text box not found");
                }
            );
        });
    //});

    this.When(/^they click the "([^"]*)" arrow button$/, function (arg1, callback) {
        this.switchToViewerFrame();
        ptor.findElement(protractor.By.css('.imageBtn.next')).then(
            function(next){
                next.click();
                ptor.switchTo().defaultContent();
                callback();
            },
            function(){
                callback.fail("button go not found");
            }
        )
    });

    this.Then(/^the content of the page (\d+) is displayed to the user$/, function (arg1, callback) {
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.thumb.selected .label')).then(
                function (label) {
                    //expect(label.getText()).toContain('13');
                    //ptor.switchTo().defaultContent();
                    //callback();
                    label.getText().then(function(labelText){
                        //console.log('Then label:' + labelText + 'k');
                        //assert.include(labelText,'13','pass');
                        ptor.switchTo().defaultContent();
                        callback();
                    });

                },
                function () {
                    callback.fail("incorrect page label");
                }
            )
        });
    });

    this.Given(/^The user is viewing the Viewer on page (\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Viewer is on full screen mode$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^The user is viewing the Viewer on its very first page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Previous arrow button is disabled$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the user is viewing the Viewer in its last page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Next arrow is disabled$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the user is viewing the Viewer$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^they go to the page (\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the image is labeled with page (\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};

module.exports = Navigation;