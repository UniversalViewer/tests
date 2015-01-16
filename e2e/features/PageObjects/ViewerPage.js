var ViewerPage = function () {
    var that = this;
    var ptor = browser;
    this.showdebug = false;
    this.showsteps = false;

    this.resetFrame = function(callback) {
        if(that.showdebug) { console.log('switching to viewer frame'); }
        ptor.switchTo().defaultContent().then(
            function() {
                that.sleep(1000).then(
                    function() {
                        if (that.showdebug) { console.log('switching to frame[0]'); }
                        ptor.switchTo().frame(0).then(
                            function() {
                                if (that.showdebug) { console.log('switched'); }
                                if(typeof(callback) == "function") {
                                    callback();
                                }
                            });
                    });
            });
    };

    this.sleep = function(ms) {
        if(that.showdebug) { console.log('Sleeping for ' + ms + 'ms'); }
        return ptor.sleep(ms);
    };

    this.find = function(css) {
        if(that.showdebug) { console.log('finding ' + css); }
        return element(protractor.By.css(css));
    };

    this.findAll = function(css) {
        if(that.showdebug) { console.log('finding all ' + css); }
        return element.all(protractor.By.css(css));
    };

    this.moreInformationButton = function () {
        return this.find('.rightPanel .expandButton');
    };

    this.moreInformationHeaders = function () {
        return this.find('.rightPanel .main .items .item .header');
    };

    this.moreInformationTexts = function () {
        return this.findAll('.rightPanel .main .items .item .text');
    };

    this.infoPanel = function(){
        return this.find('.rightPanel');
    };

    this.startCanvas = function() {
        return this.findAll('.openseadragon-canvas canvas');
    };

    this.searchText = function() {
        return this.find('.searchText');
    };

    this.goButton = function() {
        return this.find('.imageBtn.go');
    };

    this.navigationNextButton = function() {
        return this.find('.imageBtn.next');
    };

    this.navigationNextDisabledButton = function() {
        return this.find('.imageBtn.next.disabled');
    };

    this.navigationPrevButton = function() {
        return this.find('.imageBtn.prev');
    };

    this.navigationPrevDisabledButton = function() {
        return this.find('.imageBtn.prev.disabled');
    };

    this.selectedThumbnailLabels = function() {
        return this.findAll('.thumb.selected .label');
    };

    this.fullScreenButton = function() {
        return this.find('.imageBtn.fullScreen');
    };

    this.navigationFirstButton = function() {
        return this.find('.imageBtn.first');
    };

    this.navigationLastButton = function() {
        return this.find('.imageBtn.last');
    };

    this.canvasPrevButton = function() {
        return this.find('.paging.btn.prev');
    };

    this.canvasPrevDisabledButton = function() {
        return this.find('.paging.btn.prev.disabled');
    };

    this.canvasNextButton = function() {
        return this.find('.paging.btn.next');
    };

    this.canvasNextDisabledButton = function() {
        return this.find('.paging.btn.next.disabled');
    };

    this.contentsPanel = function() {
        return this.find('.leftPanel');
    };

    this.contentsPanelIndexTab = function() {
        return this.find('.leftPanel .main .tab.first');
    };

    this.contentsPanelIndexTabActivated = function() {
        return this.find('.leftPanel .main .tab.first.on');
    };

    this.contentsPanelIndexTabItems = function() {
        return this.findAll('.treeView .tree li');
    };

    this.contentsPanelIndexTabTreeExpansionToggles = function() {
        return this.findAll('.treeView .tree li div.toggle');
    };

    this.contentsPanelIndexTabSubTrees = function() {
        return this.findAll('.treeView .tree li ul');
    };

    this.contentsPanelThumbnailIncreaseSizeButton = function() {
        return this.find('.leftPanel .galleryView .btn.size-up');
    };

    this.contentsPanelThumbnailDecreaseSizeButton = function() {
        return this.find('.leftPanel .galleryView .btn.size-down');
    };

    this.contentsPanelExpandThumbnailsButton = function() {
        return this.find('.leftPanel > .top > a.expandFullButton');
    };

    this.contentsPanelCollapseThumbnailsButton = function() {
        return this.find('.leftPanel > .top > div.collapseButton');
    };

    this.contentsPanelLoadedImages = function() {
        return this.findAll('.wrap.loaded > img');
    };

    this.contentsPanelSelectedLoadedThumbnail = function() {
        return this.find('.galleryView .thumb.selected > .wrap.loaded');
    };

    this.contentsPanelSelectedLoadedThumbnails = function() {
        return this.findAll('.galleryView .thumb.selected > .wrap.loaded');
    };

    this.contentsPanelThumbnails = function() {
        return this.findAll('.galleryView .thumb');
    };

    this.getThumbnailPanelWidth = function(widthSettingCallback) {
        if(that.showdebug) { console.log('getting thumbnail panel width'); }
        this.resetFrame(
            function() {
                that.contentsPanel().then(
                    function(leftPanel) {
                        leftPanel.getCssValue('width').then(
                            function (w) {
                                if(that.showdebug) { console.log('got width'); }
                                widthSettingCallback(w);
                            });
                    });
            });
    };

    this.getThumbnailWidth = function(widthSettingCallback) {
        if(that.showdebug) { console.log('getting thumbnail width'); }
        this.resetFrame(
            function() {
                that.contentsPanelSelectedLoadedThumbnail().then(
                    function (thumbnail) {
                        if(that.showdebug) { console.log('will get width'); }
                        thumbnail.getCssValue('width').then(
                            function (w) {
                                if(that.showdebug) { console.log('got width'); }
                                widthSettingCallback(w);
                            });
                    });
            });
    };
};

module.exports = ViewerPage;