    var ViewerPage = function () {
        var ptor = protractor.getInstance();

        this.sleep = function(sec) {
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
            return ptor.findElements(protractor.By.css('.rightPanel .main .items .item .header'));
        }

        this.moreInformationTexts = function () {
            return ptor.findElements(protractor.By.css('.rightPanel .main .items .item .text'));
        }

        this.rightPanel = function(){
            return ptor.findElement(protractor.By.css('.rightPanel'));
        }

        this.startCanvas = function() {
            return ptor.findElements(protractor.By.css('.openseadragon-canvas canvas'));
        }

        this.searchText = function() {
            return ptor.findElement(protractor.By.css('.searchText'));
        }

        this.goButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.go'));
        }

        this.navigationNextButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.next'));
        }

        this.navigationNextDisabledButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.next.disabled'));
        }

        this.navigationPrevButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.prev'));
        }

        this.navigationPrevDisabledButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.prev.disabled'));
        }

        this.selectedThumbnailLabels = function() {
            return ptor.findElements(protractor.By.css('.thumb.selected .label'));
        }

        this.fullScreenButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.fullScreen'));
        }

        this.navigationFirstButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.first'));
        }

        this.navigationLastButton = function() {
            return ptor.findElement(protractor.By.css('.imageBtn.last'));
        }

        this.canvasPrevButton = function() {
            return ptor.findElement(protractor.By.css('.paging.btn.prev'));
        }

        this.canvasPrevDisabledButton = function() {
            return ptor.findElement(protractor.By.css('.paging.btn.prev.disabled'));
        }

        this.canvasNextButton = function() {
            return ptor.findElement(protractor.By.css('.paging.btn.next'));
        }

        this.canvasNextDisabledButton = function() {
            return ptor.findElement(protractor.By.css('.paging.btn.next.disabled'));
        }

        this.contentsPanelIndexTab = function() {
            return ptor.findElement(protractor.By.css('.leftPanel .main .tab.first'));
        }

        this.contentsPanelIndexTabActivated = function() {
            return ptor.findElement(protractor.By.css('.leftPanel .main .tab.first.on'));
        }

        this.contentsPanelIndexTabItems = function() {
            return ptor.findElements(protractor.By.css('.treeView .tree li'));
        }

        this.contentsPanelIndexTabTreeExpansionToggles = function() {
            return ptor.findElements(protractor.By.css('.treeView .tree li div.toggle'));
        }

        this.contentsPanelIndexTabSubTrees = function() {
            return ptor.findElements(protractor.By.css('.treeView .tree li ul'));
        }
    }

 module.exports = ViewerPage;