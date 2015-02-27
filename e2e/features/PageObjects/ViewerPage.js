var ViewerPage = function () {
    var that = this;
    var ptor = browser;

    this.showdebug = true;
    this.showsteps = true;

    this.frameSwitchDelay = 1000;
    this.reactionDelay = 5000;
    this.pageLoadDelay = 5000;

    /* CORE */
    {
        this.resetFrame = function(callback) {
            if(that.showdebug) { console.log('resetting frame'); }
            ptor.switchTo().defaultContent().then(
                function() {
                    that.sleep(that.frameSwitchDelay).then(
                        function() {
                            ptor.switchTo().frame(0).then(
                                function() {
                                    if(typeof(callback) == "function") {
                                        callback();
                                    }
                                });
                        });
                });
        };

        this.resetFrame2 = function(callback) {
            if(that.showdebug) { console.log('switching to viewer frame'); }
            ptor.switchTo().defaultContent().then(
                function() {
                    that.sleep(that.frameSwitchDelay).then(
                        function() {
                            if (that.showdebug) { console.log('switching to frame[0]'); }
                            return ptor.switchTo().frame(0);
                        });
                });
        };

        this.sleep = function(ms) {
            if(that.showdebug) { console.log('sleeping for ' + ms + 'ms'); }
            return ptor.sleep(ms);
        };

        that.find = function(css) {
            if(that.showdebug) { console.log('finding ' + css); }
            return element(protractor.By.css(css));
        };

        that.findWrapped = function(css, protractorCallback, continuation) {
            that.resetFrame(
                function() {
                    that.find(css).then(
                        continuation,
                        function() {
                            protractorCallback.fail('could not find ' + css);
                        });
                });
        };

        that.findAll = function(css) {
            if(that.showdebug) { console.log('finding all ' + css); }
            return element.all(protractor.By.css(css));
        };

        // wrap findAll functionality in a resetFrame call
        that.findAllWrapped = function(css, protractorCallback, continuation) {
            that.resetFrame(
                function() {
                    that.findAll(css).then(
                        continuation,
                        function() {
                            protractorCallback.fail('could not find any ' + css);
                        });
                });
        };

        // experimental version of abstraction showing use of findWrapped
        this.moreInformationPanelExpandButton2 = function(protractorCallback, continuation) {
            that.findWrapped('.rightPanel .expandButton', protractorCallback, continuation);
        };

        this.getTextOfElement = function(elementFinderPromise, protractorCallback, continuation) {
            elementFinderPromise.then(
                function(theElement) {
                    theElement.getText().then(
                        continuation, // will pass text to this function
                        function() {
                            protractorCallback.fail('could not get text of element');
                        });
                },
                function() {
                    protractorCallback.fail('could not find element');
                });
        };

        this.getValueOfElement = function(elementFinderPromise, protractorCallback, continuation) {
            elementFinderPromise.then(
                function(theElement) {
                    theElement.getAttribute("value").then(
                        continuation, // will pass value to this function
                        function() {
                            protractorCallback.fail('could not get value of element');
                        });
                },
                function() {
                    protractorCallback.fail('could not find element');
                });
        };
    }

    /* MORE INFORMATION PANEL */
    {
        this.moreInformationPanelExpandButton = function () {
            return that.find('.rightPanel .expandButton');
        };

        this.moreInformationHeaders = function () {
            return that.findAll('.rightPanel .main .items .item .header');
        };

        this.moreInformationTexts = function () {
            return that.findAll('.rightPanel .main .items .item .text');
        };

        this.moreInformationPanelCollapseButton = function () {
            return that.find('.rightPanel .collapseButton');
        };

        this.moreInformationPanelRightsNoticeTitle = function () {
            return that.find('.rightPanel .main .items .item.attribution .header');
        };

        this.moreInformationPanelRightsNoticeAttribution = function () {
            return that.find('.rightPanel .main .items .item.attribution .text');
        };

        this.moreInformationPanelRightsNoticeToggle = function () {
            return that.find('.rightPanel .main .items .item.attribution .text a.toggle');
        };

        this.moreInformationPanelRightsNoticeAttributionMoreButton = function () {
            return that.find('.rightPanel .main .items .item.attribution .text a.toggle.more');
        };

        this.moreInformationPanelRightsNoticeAttributionLessButton = function () {
            return that.find('.rightPanel .main .items .item.attribution .text a.toggle.less');
        };

        this.moreInformationPanel = function () {
            return that.find('.rightPanel');
        };

        this.moreInformationPanelTitle = function() {
            return that.find('.rightPanel .top .title');
        };

        this.moreInformationPanelMetaDataLabel = function(labelName) {
            return that.find('.rightPanel .main .items .item.' + labelName + ' .header');
        };

        this.moreInformationPanelMetaDataValue = function(labelName) {
            return that.find('.rightPanel .main .items .item.' + labelName + ' .text');
        };

        this.moreInformationPanelMetaDataValueAnchor = function(labelName) {
            return that.find('.rightPanel .main .items .item.' + labelName + ' .text a');
        };
    }
    /* END OF MORE INFORMATION PANEL */

    /* NAVIGATION AND SEADRAGON PANEL */
    {
        this.startCanvas = function () {
            return that.findAll('.openseadragon-canvas canvas');
        };

        this.startContainer = function() {
            return that.find('#viewer > .openseadragon-container');
        };

        this.searchText = function () {
            return that.find('.searchText');
        };

        this.searchImageLabel = function () {
            return that.find('.headerPanel .options .centerOptions .mode label[for=image]');
        };

        this.searchPageLabel = function() {
            return that.find('.headerPanel .options .centerOptions .mode label[for=page]')
        }

        this.goButton = function () {
            return that.find('.btn.go');
        };

        this.navigationNextButton = function () {
            return that.find('.imageBtn.next');
        };

        this.navigationNextDisabledButton = function () {
            return that.find('.imageBtn.next.disabled');
        };

        this.navigationPrevButton = function () {
            return that.find('.imageBtn.prev');
        };

        this.navigationPrevDisabledButton = function () {
            return that.find('.imageBtn.prev.disabled');
        };

        this.selectedThumbnailLabels = function () {
            return that.findAll('.thumb.selected .label');
        };

        this.navigationFirstButton = function () {
            return that.find('.imageBtn.first');
        };

        this.navigationLastButton = function () {
            return that.find('.imageBtn.last');
        };

        this.canvasPrevButton = function () {
            return that.find('.paging.btn.prev');
        };

        this.canvasPrevDisabledButton = function () {
            return that.find('.paging.btn.prev.disabled');
        };

        this.canvasNextButton = function () {
            return that.find('.paging.btn.next');
        };

        this.canvasNextDisabledButton = function () {
            return that.find('.paging.btn.next.disabled');
        };

        this.canvasZoomInButton = function() {
            return that.find('div.zoomIn');
         };

        this.canvasZoomOutButton = function() {
            return that.find('div.zoomOut');
        };

        this.canvasHomeButton = function() {
            return that.find('div.goHome');
        };

        this.canvasRotateButton = function() {
            return that.find('div.rotate');
        };
    }
    /* END OF NAVIGATION AND SEADRAGON PANEL */

    /* SETTINGS PANEL */
    {
        this.fullScreenButton = function () {
            return that.find('.imageBtn.fullScreen');
        };

        this.settingsButton = function () {
            return that.find('.imageBtn.settings');
        };

        this.settingsMenuHeader = function() {
            return that.find('.overlays .overlay.settings .middle .content > h1');
        };

        this.optionTwoUpCheckbox = function () {
            return that.find('#pagingEnabled');
        };

        this.settingsCloseButton = function () {
            return that.find('.overlays .settings .top .close');
        };
    }
    /* END OF SETTINGS PANEL */

    /* CONTENTS PANEL */
    {
        this.contentsPanel = function () {
            return that.find('.leftPanel');
        };

        this.contentsPanelTitle = function() {
            return this.find('.leftPanel .top .title');
        };

        this.contentsPanelIndexTab = function () {
            return that.find('.leftPanel .main .tabs a.tab.index');
        };

        this.contentsPanelIndexTabActivated = function () {
            return that.find('.leftPanel .main .tabs a.first.on');
        };

        this.contentsPanelIndexTabItems = function () {
            return that.findAll('.treeView .tree li');
        };

        this.contentsPanelIndexTabItemSelected = function () {
            return that.find('.treeView .tree li a.selected');
        };

        this.contentsPanelIndexTabItemAnchors = function () {
            return that.findAll('.treeView .tree li a');
        };

        this.contentsPanelIndexTabTreeExpansionToggles = function () {
            return that.findAll('.treeView .tree li div.toggle');
        };

        this.contentsPanelIndexTabTreeExpandedToggles = function () {
            return that.findAll('.treeView .tree li div.toggle.expanded');
        };

        this.contentsPanelIndexTabSubTrees = function () {
            return that.findAll('.treeView .tree li ul');
        };

        this.contentsPanelThumbnailTab = function() {
            return that.find('.leftPanel .main .tabs a.tab.thumbs');
        };

        this.contentsPanelThumbnailIncreaseSizeButton = function () {
            return that.find('.leftPanel .galleryView .btn.size-up');
        };

        this.contentsPanelThumbnailDecreaseSizeButton = function () {
            return that.find('.leftPanel .galleryView .btn.size-down');
        };

        this.contentsPanelExpandThumbnailsButton = function () {
            return that.find('.leftPanel > .top > a.expandFullButton');
        };

        this.contentsPanelCollapseThumbnailsButton = function () {
            return that.find('.leftPanel > .top > div.collapseButton');
        };

        this.contentsPanelLoadedImages = function () {
            return that.findAll('.wrap.loaded > img');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnail = function () {
            return that.find('.thumbsView .thumb.selected');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnail = function () {
            return that.find('.galleryView .thumb.selected');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnailLabels = function () {
            return that.findAll('.thumbsView .thumb.selected > .label');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnailLabels = function () {
            return that.findAll('.galleryView .thumb.selected > .label');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnailLabel = function () {
            return that.find('.thumbsView .thumb.selected > .label');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnailLabel = function () {
            return that.find('.galleryView .thumb.selected > .label');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnailWrap = function () {
            return that.find('.thumbsView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnailWrap = function () {
            return that.find('.galleryView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnails = function () {
            return that.findAll('.thumbsView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnails = function () {
            return that.findAll('.galleryView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelNonExpandedFrame = function () {
            return that.find('.thumbsView');
        };

        this.contentsPanelExpandedFrame = function () {
            return that.find('.galleryView');
        };

        this.contentsPanelNonExpandedThumbnails = function () {
            return that.findAll('.thumbsView .thumb');
        };

        this.contentsPanelExpandedThumbnails = function () {
            return that.findAll('.galleryView .thumb');
        };
    }
    /* END OF CONTENTS PANEL */

    /* CENTER PANEL */
    {
        this.centerPanelRightsNoticeTitle = function () {
            return that.find('.centerPanel .rights .header .title');
        };

        this.centerPanelRightsNoticeAttribution = function () {
            return that.find('.centerPanel .rights .main .attribution');
        };

        this.centerPanelRightsNoticeAttributionMoreToggle = function () {
            return that.find('.centerPanel .rights .main .attribution a.toggle');
        };

        this.centerPanelRightsNoticeAttributionMoreButton = function () {
            return that.find('.centerPanel .rights .main .attribution a.toggle.more');
        };

        this.centerPanelRightsNoticeAttributionLessButton = function () {
            return that.find('.centerPanel .rights .main .attribution a.toggle.less');
        };

        this.centerPanelRightsNoticeLicense = function () {
            return that.find('.centerPanel .rights .main .license');
        };

        this.centerPanelRightsNoticeLogo = function () {
            return that.find('.centerPanel .rights .main .logo');
        };

        this.centerPanelWorkTitle = function() {
            return that.find('.centerPanel > .title');
        };

        this.centerPanelWorkTitleSpan = function() {
            return that.find('.centerPanel > .title > span');
        };
    }
    /* END OF CENTER PANEL */

    /* LANGUAGE SELECTION */
    {
        this.localeMenu = function() {
            return that.find("#locale");
        };
    }
    /* END OF LANGUAGE SELECTION */

    /* EMBEDDING */
    {
        this.embedButton = function () {
            return that.find('.footerPanel .options a.embed');
        };

        this.embedOverlayContent = function() {
            return that.find('.overlays .overlay.embed .middle .content > p');
        }
    }
    /* END OF EMBEDDING */

    /* DOWNLOADING */
    {
        this.downloadButton = function() {
            return that.find('.footerPanel .options a.download');
        };

        this.downloadOverlayContent = function() {
            return that.find('.overlays .overlay.download .middle .content');
        };

        this.downloadOverlayMenuCurrentViewAsJpeg = function() {
            return that.find('#currentViewAsJpg');
        };

        this.downloadOverlayMenuWholeImageHighResAsJpeg = function() {
            return that.find('#wholeImageHighResAsJpg');
        };

        this.downloadOverlayMenuWholeImageLowResAsJpeg = function() {
            return that.find('#wholeImageLowResAsJpg');
        };

        this.downloadOverlayMenuEntireDocumentAsPdf = function() {
            return that.find('#entireDocumentAsPdf');
        };

        this.downloadOverlayPreviewButton = function() {
            return that.find('.overlays .overlay.download .middle .buttons a.preview');
        };

        this.downloadOverlayDownloadButton = function() {
            return that.find('.overlays .overlay.download .middle .buttons a.download');
        };

        this.downloadOverlayCloseButton = function() {
            return that.find('.overlays .overlay.download .top .close');
        };
    }

    /* ACTIONS */
    {
        /* SETTINGS */
        {
            this.enterTwoUpMode = function(protractorCallback, continuation) {
                if(this.showdebug) { console.log('entering two-up mode'); }
                var that = this;
                that.resetFrame(
                    function() {
                        that.settingsButton().then(
                            function(settingsButton) {
                                settingsButton.click().then(
                                    function() {
                                        that.resetFrame(
                                            function() {
                                                that.optionTwoUpCheckbox().then(
                                                    function (optionTwoUpCheckbox) {
                                                        optionTwoUpCheckbox.getAttribute('checked').then(
                                                            function(checked) {
                                                                if(!checked) {
                                                                    // already un-checked
                                                                    continuation();
                                                                } else {
                                                                    optionTwoUpCheckbox.click().then(
                                                                        function () {
                                                                            that.resetFrame(
                                                                                function () {
                                                                                    that.settingsCloseButton().then(
                                                                                        function (settingsCloseButton) {
                                                                                            settingsCloseButton.click().then(
                                                                                                continuation,
                                                                                                function () {
                                                                                                    protractorCallback.fail('could not click settings close button to exit option screen');
                                                                                                });
                                                                                        },
                                                                                        function() {
                                                                                            protractorCallback.fail('could not find settings close button');
                                                                                        });
                                                                                });
                                                                        },
                                                                        function () {
                                                                            protractorCallback.fail('could not click two-up checkbox option');
                                                                        });
                                                                }
                                                            },
                                                            function() {
                                                                protractorCallback.fail('could not get checked attribute of two-up checkbox option');
                                                            });
                                                    },
                                                    function () {
                                                        protractorCallback.fail('could not find two-up checkbox option');
                                                    });
                                            });
                                    },
                                    function() {
                                        protractorCallback.fail('could not click settings button');
                                    });
                            },
                            function() {
                                protractorCallback.fail('could not find settings button');
                            });
                    });
            };

            this.enterOneUpMode = function(protractorCallback, continuation) {
                if(this.showdebug) { console.log('entering one-up mode'); }
                var that = this;
                that.resetFrame(
                    function() {
                        that.settingsButton().then(
                            function(settingsButton) {
                                settingsButton.click().then(
                                    function() {
                                        that.resetFrame(
                                            function() {
                                                that.optionTwoUpCheckbox().then(
                                                    function (optionTwoUpCheckbox) {
                                                        optionTwoUpCheckbox.getAttribute('checked').then(
                                                            function(checked) {
                                                                if(checked) {
                                                                    optionTwoUpCheckbox.click().then(
                                                                        function () {
                                                                            that.resetFrame(
                                                                                function () {
                                                                                    that.settingsCloseButton().then(
                                                                                        function (settingsCloseButton) {
                                                                                            settingsCloseButton.click().then(
                                                                                                continuation,
                                                                                                function () {
                                                                                                    protractorCallback.fail('could not click settings close button to exit option screen');
                                                                                                });
                                                                                        },
                                                                                        function() {
                                                                                            protractorCallback.fail('could not find settings close button');
                                                                                        });
                                                                                });
                                                                        },
                                                                        function () {
                                                                            protractorCallback.fail('could not click two-up checkbox option');
                                                                        });
                                                                } else {
                                                                    // already un-checked
                                                                    continuation();
                                                                }
                                                            },
                                                            function() {
                                                                protractorCallback.fail('could not get checked attribute of two-up checkbox option');
                                                            });
                                                    },
                                                    function () {
                                                        protractorCallback.fail('could not find two-up checkbox option');
                                                    });
                                            });
                                    },
                                    function() {
                                        protractorCallback.fail('could not click settings button');
                                    });
                            },
                            function() {
                                protractorCallback.fail('could not find settings button');
                            });
                    });
            };

            this.clickSettingsCloseButton = function(protractorCallback, continuation) {
                if(that.showdebug) { console.log('closing settings menu'); }
                that.resetFrame(
                    function() {
                        that.settingsCloseButton().then(
                            function(settingsCloseButton) {
                                settingsCloseButton.isDisplayed().then(
                                    function(settingsCloseButtonIsDisplayed) {
                                        if(settingsCloseButtonIsDisplayed) {
                                            settingsCloseButton.click().then(
                                                continuation,
                                                function() {
                                                    protractorCallback.fail('could not click settingsCloseButton');
                                                });
                                        } else {
                                            if(that.showdebug) { console.log('settingsCloseButton not displayed'); }
                                            continuation();
                                        }
                                    },
                                    function() {
                                        protractorCallback.fail('could not get isDisplayed of settingsCloseButton');
                                    });
                            },
                            function() {
                                protractorCallback.fail('could not find settingsCloseButton');
                            });
                    });
            };

            this.selectLocale = function(locale, protractorCallback, continuation) {
                if(that.showdebug) { console.log('selecting locale ' + locale); }
                that.resetFrame(
                    function() {
                        that.settingsButton().then(
                            function(settingsButton) {
                                settingsButton.click().then(
                                    function() {
                                        that.localeMenu().then(
                                            function(localeMenu) {
                                                localeMenu.click().then(
                                                    function() {
                                                        element(protractor.By.css("#locale option[value='" + locale + "']")).then(
                                                            function(localeOption) {
                                                                localeOption.isSelected().then(
                                                                    function(localeOptionIsSelected) {
                                                                        if(localeOptionIsSelected) {
                                                                            that.clickSettingsCloseButton(protractorCallback, continuation);
                                                                        } else {
                                                                            localeOption.click().then(
                                                                                continuation,
                                                                                function() {
                                                                                    protractorCallback.fail('could not click localeOption');
                                                                                });
                                                                        }},
                                                                    function() {
                                                                        protractorCallback.fail('could not get isSelected property of localeOption');
                                                                    });
                                                            },
                                                            function() {
                                                                protractorCallback.fail('could not find locale option with value "' + locale + '"');
                                                            });
                                                    },
                                                    function() {
                                                        protractorCallback.fail('could not click localeMenu');
                                                    });
                                            },
                                            function() {
                                                protractorCallback.fail('could not find localeMenu');
                                            });
                                    },
                                    function() {
                                        protractorCallback.fail('could not click settingsButton');
                                    });
                            },
                            function() {
                                protractorCallback.fail('could not find settingsButton');
                            });
                    });
            };
        }
        /* END OF SETTINGS */

        /* WIDTH FINDERS */
        {
            /* sometimes, I disgust even myself */
            this.widthFinderGeneral = function(widthSettingCallback, elementPromise, callback) {
                this.resetFrame(
                    function() {
                        elementPromise().then(
                            function(theElement) {
                                if(that.showdebug) { console.log('will get width'); }
                                theElement.getCssValue('width').then(
                                    function(w) {
                                        if(that.showdebug) { console.log('got width: ' + w); }
                                        widthSettingCallback(w.replace('px', ''));
                                    },
                                    function() {
                                        callback.fail('could not get width of element');
                                    });
                            },
                            function() {
                                callback.fail('could not find element');
                            });
                    });
            };

            this.getThumbnailPanelWidth = function(widthSettingCallback, callback) {
                if(that.showdebug) { console.log('getting thumbnail panel width'); }
                that.widthFinderGeneral(widthSettingCallback, that.contentsPanel, callback);
            };

            this.getThumbnailWidthInExpandedView = function(widthSettingCallback, callback) {
                if(that.showdebug) { console.log('getting thumbnail width'); }
                that.widthFinderGeneral(widthSettingCallback, that.contentsPanelExpandedSelectedLoadedThumbnailWrap, callback);
            };

            this.getThumbnailWidthInNonExpandedView = function(widthSettingCallback, callback) {
                if(that.showdebug) { console.log('getting thumbnail width'); }
                that.widthFinderGeneral(widthSettingCallback, that.contentsPanelNonExpandedSelectedLoadedThumbnailWrap, callback);
            };
        }
        /* END OF WIDTH FINDERS */

        this.recursivelyExpandIndexItems = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('recursively expanding index items...'); }
            that.resetFrame(
                function() {
                    that.contentsPanelIndexTabTreeExpansionToggles().then(
                        function(contentsPanelIndexTabTreeExpansionToggles) {
                            if(contentsPanelIndexTabTreeExpansionToggles.length > 0) {
                                for(var x = 0; x < contentsPanelIndexTabTreeExpansionToggles.length; x++) {
                                    var toggle = contentsPanelIndexTabTreeExpansionToggles[x];
                                    toggle.getAttribute('class').then(
                                        function(attributeClass) {
                                            if(attributeClass.indexOf('expanded') == -1) {
                                                if(that.showdebug) { console.log('clicking expand toggle'); }
                                                toggle.click().then(
                                                    function() {
                                                        that.resetFrame(
                                                            function() {
                                                                that.contentsPanelIndexTabTreeExpansionToggles().then(
                                                                    function(expansionToggles) {
                                                                        that.resetFrame(
                                                                            function() {
                                                                                that.contentsPanelIndexTabTreeExpandedToggles().then(
                                                                                    function(expandedToggles) {
                                                                                        if(expandedToggles.length == expansionToggles.length) {
                                                                                            if(that.showdebug) { console.log('total toggles equals expanded toggles'); }
                                                                                            continuation();
                                                                                        } else {
                                                                                            if(that.showdebug) { console.log('total toggles: ' + expansionToggles.length + ' expanded: ' + expandedToggles.length); }
                                                                                            if(that.showdebug) { console.log('recursing ... '); }
                                                                                            that.recursivelyExpandIndexItems(protractorCallback, continuation);
                                                                                        }
                                                                                    });
                                                                            });
                                                                    },
                                                                    function() {
                                                                        protractorCallback.fail('could not find any expansion toggles');
                                                                    });
                                                            });
                                                    },
                                                    function() {
                                                        protractorCallback.fail('clicking an expansion toggle failed');
                                                    });
                                            }
                                        });
                                }
                            } else {
                                protractorCallback.fail('could not find any expansion toggles');
                            }
                        });
                });
        };

        this.toggleCenterPanelRightsDisplayAttributionLength = function(protractorCallback) {
            if(that.showdebug) { console.log('toggling center panel rights display more/less'); }
            that.resetFrame(
                function() {
                    that.centerPanelRightsNoticeAttributionMoreToggle().then(
                        function(centerPanelRightsNoticeAttributionMoreToggle) {
                            centerPanelRightsNoticeAttributionMoreToggle.click().then(
                                protractorCallback,
                                function() {
                                    protractorCallback.fail('could not click centerPanelRightsNoticeAttributionMoreToggle');
                                });
                        },
                        function() {
                            protractorCallback.fail('could not find centerPanelRightsNoticeAttributionMoreToggle');
                        });
                });
        };

        this.clickMoreInformation = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('clicking MORE INFORMATION'); }
            that.resetFrame(
                function() {
                    that.moreInformationPanelExpandButton().then(
                        function(moreInformationPanelExpandButton) {
                            moreInformationPanelExpandButton.isDisplayed().then(
                                function(moreInformationPanelExpandButtonIsDisplayed) {
                                    if(moreInformationPanelExpandButtonIsDisplayed) {
                                        if(that.showdebug) { console.log('more information expand button is visible'); }
                                        moreInformationPanelExpandButton.click().then(
                                            continuation,
                                            function() {
                                                protractorCallback.fail('clicking more information button failed');
                                            });
                                    } else {
                                        if(that.showdebug) { console.log('more information expand button is not visible'); }
                                        that.moreInformationPanelCollapseButton().then(
                                            function(moreInformationPanelCollapseButton) {
                                                moreInformationPanelCollapseButton.isDisplayed().then(
                                                    function(moreInformationPanelCollapseButtonIsDisplayed) {
                                                        if(moreInformationPanelCollapseButtonIsDisplayed) {
                                                            if(that.showdebug) { console.log('more information collapse button is visible'); }
                                                            if(that.showdebug) { console.log('more information panel must be already open'); }
                                                            continuation();
                                                        } else {
                                                            protractorCallback.fail('more information expand and collapse buttons not visible');
                                                        }
                                                    },
                                                    function() {
                                                        protractorCallback.fail('could not determine whether more information collapse button is visible');
                                                    });
                                            },
                                            function() {
                                                protractorCallback.fail('could not find more information collapse button');
                                            });
                                    }
                                },
                                function() {
                                    protractorCallback.fail('could not determine whether more information expand button is visible');
                                });
                        },
                        function() {
                            protractorCallback.fail('could not find more information expand button');
                        });
                });
        };

        this.clickContents = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('clicking CONTENTS'); }
            that.resetFrame(
                function() {
                    that.contentsPanelExpandThumbnailsButton().then(
                        function(contentsPanelExpandThumbnailsButton) {
                            contentsPanelExpandThumbnailsButton.isDisplayed().then(
                                function(contentsPanelExpandThumbnailsButtonIsDisplayed) {
                                    if(contentsPanelExpandThumbnailsButtonIsDisplayed) {
                                        if(that.showdebug) { console.log('contents panel thumbnails expand button is visible'); }
                                        contentsPanelExpandThumbnailsButton.click().then(
                                            continuation,
                                            function() {
                                                protractorCallback.fail('clicking contents panel thumbnails expand button failed');
                                            });
                                    } else {
                                        if(that.showdebug) { console.log('contents panel thumbnails expand button is not visible'); }
                                        that.contentsPanelCollapseThumbnailsButton().then(
                                            function(contentsPanelCollapseThumbnailsButton) {
                                                contentsPanelCollapseThumbnailsButton.isDisplayed().then(
                                                    function(contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                                        if(contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                                            if(that.showdebug) { console.log('contents panel thumbnails collapse button is visible'); }
                                                            if(that.showdebug) { console.log('contents panel thumbnails must be already open'); }
                                                            continuation();
                                                        } else {
                                                            protractorCallback.fail('contents panel thumbnails expand and collapse buttons not visible');
                                                        }
                                                    },
                                                    function() {
                                                        protractorCallback.fail('could not determine whether contents panel thumbnails collapse button is visible');
                                                    });
                                            },
                                            function() {
                                                protractorCallback.fail('could not find contents panel thumbnails collapse button');
                                            });
                                    }
                                },
                                function() {
                                    protractorCallback.fail('could not determine whether contents panel thumbnails expand button is visible');
                                });
                        },
                        function() {
                            protractorCallback.fail('could not find contents panel thumbnails expand button');
                        });
                });
        };

        this.clickContentsIndexTab = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('clicking CONTENTS index tab'); }
            that.resetFrame(
                function() {
                    that.contentsPanelIndexTab().then(
                        function (contentsPanelIndexTab) {
                            if(that.showdebug) { console.log('found index tab'); }
                            contentsPanelIndexTab.click().then(
                                function () {
                                    if(that.showdebug) { console.log('clicked index tab'); }
                                    that.resetFrame(
                                        function() {
                                            that.contentsPanelIndexTabActivated().then(
                                                function(contentsPanelIndexTabActivated) {
                                                    if(that.showdebug) { console.log('found active index tab'); }
                                                    continuation();
                                                },
                                                function() {
                                                    protractorCallback.fail('contents panel active index tab not found');
                                                });
                                        });
                                },
                                function() {
                                    protractorCallback.fail('clicking on contents panel index tab failed');
                                });
                        },
                        function() {
                            protractorCallback.fail('contents panel index tab not found');
                        });
                });
        };

        this.clickContentsCollapse = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('clicking CONTENTS collapse'); }
            that.resetFrame(
                function() {
                    that.contentsPanelExpandThumbnailsButton().then(
                        function(contentsPanelExpandThumbnailsButton) {
                            contentsPanelExpandThumbnailsButton.isDisplayed().then(
                                function(contentsPanelExpandThumbnailsButtonIsDisplayed) {
                                    if(contentsPanelExpandThumbnailsButtonIsDisplayed) {
                                        if(that.showdebug) { console.log('expand is currently displayed, so we are not in fully collapsed state'); }
                                        that.contentsPanelCollapseThumbnailsButton().then(
                                            function(contentsPanelCollapseThumbnailsButton) {
                                                contentsPanelCollapseThumbnailsButton.isDisplayed().then(
                                                    function(contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                                        if(contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                                            if(that.showdebug) { console.log('can see expand and can see collapse button -- initial state'); }
                                                            // click collapse once
                                                            contentsPanelCollapseThumbnailsButton.click().then(
                                                                function() {
                                                                    that.sleep(that.reactionDelay).then(
                                                                        continuation
                                                                    );
                                                                },
                                                                function() {
                                                                    protractorCallback.fail('could not click contentsPanelCollapseThumbnailsButton');
                                                                });
                                                        } else {
                                                            if(that.showdebug) { console.log('can see expand but can\'t see collapse'); }
                                                            if(that.showdebug) { console.log('fully collapsed state'); }
                                                            continuation();
                                                        }
                                                    });
                                            });
                                    } else {
                                        if(that.showdebug) { console.log('fully expanded state'); }
                                        that.contentsPanelCollapseThumbnailsButton().then(
                                            function(contentsPanelCollapseThumbnailsButton) {
                                                contentsPanelCollapseThumbnailsButton.click().then(
                                                    function() {
                                                        that.sleep(that.reactionDelay).then(
                                                            function() {
                                                                contentsPanelCollapseThumbnailsButton.click().then(
                                                                    function() {
                                                                        // should now be in a fully collapsed state
                                                                        continuation();
                                                                    },
                                                                    function() {
                                                                        protractorCallback.fail('could not click contentsPanelCollapseThumbnailsButton');
                                                                    });
                                                            });
                                                    },
                                                    function() {
                                                        protractorCallback.fail('could not click contentsPanelCollapseThumbnailsButton');
                                                    });
                                            },
                                            function() {
                                                protractorCallback.fail('could not find contentsPanelCollapseThumbnailsButton');
                                            });
                                    }
                                });
                        },
                        function() {
                            protractorCallback.fail('could not find contentsPanelExpandThumbnailsButton');
                        });
                });
        };

        this.switchPage = function(pageIdentifier, protractorCallback, continuation) {
            if(that.showdebug) { console.log('switching page to ' + pageIdentifier); }
            that.resetFrame(
                function() {
                    that.searchText().then(
                        function (searchText) {
                            searchText.clear();
                            searchText.sendKeys(pageIdentifier);
                            that.resetFrame(
                                function() {
                                    that.goButton().then(
                                        function (go) {
                                            go.click().then(
                                                continuation(),
                                                function() {
                                                    protractorCallback.fail('could not click go button');
                                                });
                                        },
                                        function () {
                                            protractorCallback.fail("button go not found");
                                        });
                                });
                        },
                        function () {
                            protractorCallback.fail("search text box not found");
                        });
                });
        };

        this.zoomIntoImage = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('zooming into image'); }
            that.resetFrame(
                function() {
                    ptor.executeScript('window.openSeadragonViewer.viewport.zoomBy(2);').then(
                        function () {
                            that.sleep(that.reactionDelay).then(
                                continuation
                            );
                        },
                        function () {
                            protractorCallback.fail('could not execute script to zoom in');
                        });
                });
        };

        this.zoomOutImage = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('zooming out image'); }
            that.resetFrame(
                function() {
                    ptor.executeScript('window.openSeadragonViewer.viewport.zoomBy(-2);').then(
                        function () {
                            that.sleep(that.reactionDelay).then(
                                continuation
                            );
                        },
                        function () {
                            protractorCallback.fail('could not execute script to zoom out');
                        });
                });
        };

        this.getZoomLevel = function(protractorCallback, continuation) {
            if(that.showdebug) { console.log('getting current zoom level'); }
            that.resetFrame(
                function() {
                    ptor.executeScript('return window.openSeadragonViewer.viewport.getZoom(true);').then(
                        function(zoomLevel) {
                            if(that.showdebug) { console.log('zoom level = ' + zoomLevel); }
                            continuation(zoomLevel);
                        }
                    );
                }
            );
        };

    }
    /* END OF ACTIONS */
};

module.exports = ViewerPage;