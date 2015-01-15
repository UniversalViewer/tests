var ViewerPage = function () {
    var that = this;
    var ptor = browser;
    var showdebug = false;

    this.resetFrame = function(callback) {
        if(showdebug) { console.log('switching to viewer frame'); }
        ptor.switchTo().defaultContent().then(
            function() {
                if(showdebug) { console.log('switched, sleeping for 3000ms'); }
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
    };

    this.sleep = function(ms) {
        if(showdebug) { console.log('Sleeping for ' + ms + 'ms'); }
        ptor.sleep(ms);
    };

    this.moreInformationButton = function () {
        return ptor.findElement(protractor.By.css('.rightPanel .expandButton'));
    };

    this.moreInformationHeaders = function () {
        return element.all(protractor.By.css('.rightPanel .main .items .item .header'));
    };

    this.moreInformationTexts = function () {
        return element.all(protractor.By.css('.rightPanel .main .items .item .text'));
    };

    this.infoPanel = function(){
        return element(protractor.By.css('.rightPanel'));
    };

    this.startCanvas = function() {
        return ptor.findElements(protractor.By.css('.openseadragon-canvas canvas'));
    };

    this.searchText = function() {
        return element(protractor.By.css('.searchText'));
    };

    this.goButton = function() {
        return element(protractor.By.css('.imageBtn.go'));
    };

    this.navigationNextButton = function() {
        return element(protractor.By.css('.imageBtn.next'));
    };

    this.navigationNextDisabledButton = function() {
        return element(protractor.By.css('.imageBtn.next.disabled'));
    };

    this.navigationPrevButton = function() {
        return element(protractor.By.css('.imageBtn.prev'));
    };

    this.navigationPrevDisabledButton = function() {
        return element(protractor.By.css('.imageBtn.prev.disabled'));
    };

    this.selectedThumbnailLabels = function() {
        return element.all(protractor.By.css('.thumb.selected .label'));
    };

    this.fullScreenButton = function() {
        return element(protractor.By.css('.imageBtn.fullScreen'));
    };

    this.navigationFirstButton = function() {
        return element(protractor.By.css('.imageBtn.first'));
    };

    this.navigationLastButton = function() {
        return element(protractor.By.css('.imageBtn.last'));
    };

    this.canvasPrevButton = function() {
        return element(protractor.By.css('.paging.btn.prev'));
    };

    this.canvasPrevDisabledButton = function() {
        return element(protractor.By.css('.paging.btn.prev.disabled'));
    };

    this.canvasNextButton = function() {
        return element(protractor.By.css('.paging.btn.next'));
    };

    this.canvasNextDisabledButton = function() {
        return element(protractor.By.css('.paging.btn.next.disabled'));
    };

    this.contentsPanel = function() {
        return element(protractor.By.css('.leftPanel'));
    };

    this.contentsPanelIndexTab = function() {
        return element(protractor.By.css('.leftPanel .main .tab.first'));
    };

    this.contentsPanelIndexTabActivated = function() {
        return element(protractor.By.css('.leftPanel .main .tab.first.on'));
    };

    this.contentsPanelIndexTabItems = function() {
        return element.all(protractor.By.css('.treeView .tree li'));
    };

    this.contentsPanelIndexTabTreeExpansionToggles = function() {
        return element.all(protractor.By.css('.treeView .tree li div.toggle'));
    };

    this.contentsPanelIndexTabSubTrees = function() {
        return element.all(protractor.By.css('.treeView .tree li ul'));
    };

    this.contentsPanelThumbnailIncreaseSizeButton = function() {
        return element(protractor.By.css('.leftPanel .galleryView .btn.size-up'));
    };

    this.contentsPanelThumbnailDecreaseSizeButton = function() {
        return element(protractor.By.css('.leftPanel .galleryView .btn.size-down'));
    };

    this.contentsPanelExpandThumbnailsButton = function() {
        return element(protractor.By.css('.leftPanel > .top > a.expandFullButton'));
    };

    this.contentsPanelCollapseThumbnailsButton = function() {
        return element(protractor.By.css('.leftPanel > .top > div.collapseButton'));
    };

    this.contentsPanelLoadedImages = function() {
        return element.all(protractor.By.css('.wrap.loaded > img'));
    };

    this.contentsPanelSelectedLoadedThumbnail = function() {
        return element(protractor.By.css('.galleryView .thumb.selected > .wrap.loaded'));
    };

    this.contentsPanelSelectedLoadedThumbnails = function() {
        return element.all(protractor.By.css('.galleryView .thumb.selected > .wrap.loaded'));
    };

    this.contentsPanelThumbnails = function() {
        return element.all(protractor.By.css('.galleryView .thumb'));
    };

    this.expandThumbnailsTab = function(callback){
        var that = this;
        if(showdebug) { console.log('expanding thumbnails tab'); }
        this.contentsPanelExpandThumbnailsButton().then(
            function (expandThumbnailsButton) {
                if(showdebug) { console.log('found expand thumbnails button'); }
                expandThumbnailsButton.isDisplayed().then(
                    function(isDisplayed) {
                        if(isDisplayed) {
                            if(showdebug) { console.log('expand is displayed'); }
                            expandThumbnailsButton.click().then(
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
                if(showdebug) { console.log('did not find expand thumbnails button'); }
            });
    };

    this.getThumbnailPanelWidth = function(widthSettingCallback) {
        this.resetFrame(
            function() {
                that.contentsPanel().then(
                    function(leftPanel) {
                        leftPanel.getCssValue('width').then(
                            function (w) {
                                if(showdebug) { console.log('got width'); }
                                widthSettingCallback(w);
                            });
                    }
                );
            }
        );
    };

    this.getThumbnailWidth = function(widthSettingCallback) {
        this.resetFrame(
            function() {
                that.contentsPanelSelectedLoadedThumbnail().then(
                    function (thumbnail) {
                        if(showdebug) { console.log('will get width'); }
                        thumbnail.getCssValue('width').then(
                            function (w) {
                                if(showdebug) { console.log('got width'); }
                                widthSettingCallback(w);
                            });
                    });
            });
    }
};

module.exports = ViewerPage;