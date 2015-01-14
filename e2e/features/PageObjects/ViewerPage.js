var ViewerPage = function () {
    var ptor = browser;
    var showdebug = false;

    this.resetFrame = function(callback) {
        if(showdebug) { console.log('switching to viewer frame'); }
        ptor.switchTo().defaultContent().then(
            function() {
                if(showdebug) { console.log('switched, sleeping'); }
                ptor.sleep(3000).then(
                    function() {
                        if (showdebug) { console.log('switching to frame[0]'); }
                        ptor.switchTo().frame(0).then(
                            function() {
                                if (showdebug) { console.log('switched'); }
                                if(typeof(callback) == "function") {
                                    callback();
                                }
                            });
                    });
            });
    }

    this.sleep = function() {
        return ptor.sleep(3000);
    }

    this.moreInformation = function () {
        return ptor.findElement(protractor.By.css('.rightPanel .expandButton'));
    }

    this.moreInformation_Click = function () {
        this.moreInformation()
            .then(function (el) {
                return el.click();
            });
    }

    this.moreInformationHeaders = function () {
        return element.all(protractor.By.css('.rightPanel .main .items .item .header'));
    }

    this.moreInformationTexts = function () {
        return element.all(protractor.By.css('.rightPanel .main .items .item .text'));
    }

    this.rightPanel = function(){
        return element(protractor.By.css('.rightPanel'));
    }

    this.startCanvas = function() {
        return ptor.findElements(protractor.By.css('.openseadragon-canvas canvas'));
    }

    this.searchText = function() {
        return element(protractor.By.css('.searchText'));
    }

    this.goButton = function() {
        return element(protractor.By.css('.imageBtn.go'));
    }

    this.navigationNextButton = function() {
        return element(protractor.By.css('.imageBtn.next'));
    }

    this.navigationNextDisabledButton = function() {
        return element(protractor.By.css('.imageBtn.next.disabled'));
    }

    this.navigationPrevButton = function() {
        return element(protractor.By.css('.imageBtn.prev'));
    }

    this.navigationPrevDisabledButton = function() {
        return element(protractor.By.css('.imageBtn.prev.disabled'));
    }

    this.selectedThumbnailLabels = function() {
        return element.all(protractor.By.css('.thumb.selected .label'));
    }

    this.fullScreenButton = function() {
        return element(protractor.By.css('.imageBtn.fullScreen'));
    }

    this.navigationFirstButton = function() {
        return element(protractor.By.css('.imageBtn.first'));
    }

    this.navigationLastButton = function() {
        return element(protractor.By.css('.imageBtn.last'));
    }

    this.canvasPrevButton = function() {
        return element(protractor.By.css('.paging.btn.prev'));
    }

    this.canvasPrevDisabledButton = function() {
        return element(protractor.By.css('.paging.btn.prev.disabled'));
    }

    this.canvasNextButton = function() {
        return element(protractor.By.css('.paging.btn.next'));
    }

    this.canvasNextDisabledButton = function() {
        return element(protractor.By.css('.paging.btn.next.disabled'));
    }

    this.contentsPanelIndexTab = function() {
        return element(protractor.By.css('.leftPanel .main .tab.first'));
    }

    this.contentsPanelIndexTabActivated = function() {
        return element(protractor.By.css('.leftPanel .main .tab.first.on'));
    }

    this.contentsPanelIndexTabItems = function() {
        return element.all(protractor.By.css('.treeView .tree li'));
    }

    this.contentsPanelIndexTabTreeExpansionToggles = function() {
        return element.all(protractor.By.css('.treeView .tree li div.toggle'));
    }

    this.contentsPanelIndexTabSubTrees = function() {
        return elements(protractor.By.css('.treeView .tree li ul'));
    }

    this.expandThumbnailsTab = function(callback){
        var that = this;
        if(showdebug) { console.log('expanding thumbnails tab'); }
        element(protractor.By.css('.leftPanel > .top > a.expandFullButton'))
            .then(
                function (el) {
                    if(showdebug) { console.log('found .leftPanel > .top > a.expandFullButton'); }
                    el.isDisplayed().then(
                        function(isDisplayed) {
                            if(isDisplayed) {
                                if(showdebug) { console.log('expand is displayed'); }
                                el.getWebElement().click()
                                    .then(
                                        function(){
                                            if(showdebug) { console.log('clicked expand'); }
                                            that.SetLeftPanelWidth(callback);
                                        });
                            } else {
                                if(showdebug) { console.log('expand is not displayed'); }
                            }
                            callback();
                        }
                    );
                },
                function () {
                    if(showdebug) { console.log('did not find .leftPanel > .top > a.expandFullButton'); }
                });
    };

    this.getThumbnailPanelWidth = function(widthSettingCallback) {
        this.resetFrame(
            function(cb) {
                element(protractor.By.css('.leftPanel')).then(
                    function(leftPanel) {
                        leftPanel.getCssValue('width')
                            .then(function (w) {
                                if(showdebug) { console.log('got width'); }
                                widthSettingCallback(w);
                            });
                    }
                );
            }
        );
    }
}

module.exports = ViewerPage;