var ViewerPage = function () {
    var that = this;
    var ptor = browser;

    this.showdebug = true;
    this.showsteps = true;

    this.frameSwitchDelay = 1000;
    this.reactionDelay = 5000;
    this.pageLoadDelay = 5000;

    this.resetFrame = function(callback) {
        if(that.showdebug) { console.log('switching to viewer frame'); }
        ptor.switchTo().defaultContent().then(
            function() {
                that.sleep(that.frameSwitchDelay).then(
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

    this.find = function(css) {
        if(that.showdebug) { console.log('finding ' + css); }
        return element(protractor.By.css(css));
    };

    this.findWrapped = function(css, protractorCallback, continuation) {
        that.resetFrame(
            function() {
                that.find(css).then(
                    continuation,
                    function() {
                        protractorCallback.fail('could not find ' + css);
                    });
            });
    };

    this.findAll = function(css) {
        if(that.showdebug) { console.log('finding all ' + css); }
        return element.all(protractor.By.css(css));
    };

    // wrap findAll functionality in a resetFrame call
    this.findAllWrapped = function(css, protractorCallback, continuation) {
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
        this.findWrapped('.rightPanel .expandButton', protractorCallback, continuation);
    };

    /* MORE INFORMATION PANEL */
    {
        this.moreInformationPanelExpandButton = function () {
            return this.find('.rightPanel .expandButton');
        };

        this.moreInformationHeaders = function () {
            return this.findAll('.rightPanel .main .items .item .header');
        };

        this.moreInformationTexts = function () {
            return this.findAll('.rightPanel .main .items .item .text');
        };

        this.moreInformationPanelCollapseButton = function () {
            return this.find('.rightPanel .collapseButton');
        };

        this.moreInformationPanelRightsNoticeTitle = function () {
            return this.find('.rightPanel .main .items .item.attribution .header');
        };

        this.moreInformationPanelRightsNoticeAttribution = function () {
            return this.find('.rightPanel .main .items .item.attribution .text');
        };

        this.moreInformationPanelRightsNoticeToggle = function () {
            return this.find('.rightPanel .main .items .item.attribution .text a.toggle');
        };

        this.moreInformationPanelRightsNoticeAttributionMoreButton = function () {
            return this.find('.rightPanel .main .items .item.attribution .text a.toggle.more');
        };

        this.moreInformationPanelRightsNoticeAttributionLessButton = function () {
            return this.find('.rightPanel .main .items .item.attribution .text a.toggle.less');
        };

        this.infoPanel = function () {
            return this.find('.rightPanel');
        };
    }
    /* END OF MORE INFORMATION PANEL */

    /* NAVIGATION AND SEADRAGON PANEL */
    {
        this.startCanvas = function () {
            return this.findAll('.openseadragon-canvas canvas');
        };

        this.searchText = function () {
            return this.find('.searchText');
        };

        this.searchImageLabel = function () {
            return this.find('.headerPanel .options .centerOptions .mode label[for=image]');
        };

        this.searchPageLabel = function() {
            return this.find('.headerPanel .options .centerOptions .mode label[for=page]')
        }

        this.goButton = function () {
            return this.find('.imageBtn.go');
        };

        this.navigationNextButton = function () {
            return this.find('.imageBtn.next');
        };

        this.navigationNextDisabledButton = function () {
            return this.find('.imageBtn.next.disabled');
        };

        this.navigationPrevButton = function () {
            return this.find('.imageBtn.prev');
        };

        this.navigationPrevDisabledButton = function () {
            return this.find('.imageBtn.prev.disabled');
        };

        this.selectedThumbnailLabels = function () {
            return this.findAll('.thumb.selected .label');
        };

        this.fullScreenButton = function () {
            return this.find('.imageBtn.fullScreen');
        };

        this.settingsButton = function () {
            return this.find('.imageBtn.settings');
        };

        this.optionTwoUpCheckbox = function () {
            return this.find('#pagingEnabled');
        };

        this.settingsCloseButton = function () {
            return this.find('.overlays .settings .top .close');
        };

        this.navigationFirstButton = function () {
            return this.find('.imageBtn.first');
        };

        this.navigationLastButton = function () {
            return this.find('.imageBtn.last');
        };

        this.canvasPrevButton = function () {
            return this.find('.paging.btn.prev');
        };

        this.canvasPrevDisabledButton = function () {
            return this.find('.paging.btn.prev.disabled');
        };

        this.canvasNextButton = function () {
            return this.find('.paging.btn.next');
        };

        this.canvasNextDisabledButton = function () {
            return this.find('.paging.btn.next.disabled');
        };

        this.canvasZoomInButton = function() {
            return this.find('div.zoomIn');
         };

        this.canvasZoomOutButton = function() {
            return this.find('div.zoomOut');
        };

        this.canvasHomeButton = function() {
            return this.find('div.goHome');
        };

        this.canvasRotateButton = function() {
            return this.find('div.rotate');
        };
    }
    /* END OF NAVIGATION AND SEADRAGON PANEL */

    /* CONTENTS PANEL */
    {
        this.contentsPanel = function () {
            return this.find('.leftPanel');
        };

        this.contentsPanelIndexTab = function () {
            return this.find('.leftPanel .main .tabs a.first');
        };

        this.contentsPanelIndexTabActivated = function () {
            return this.find('.leftPanel .main .tabs a.first.on');
        };

        this.contentsPanelIndexTabItems = function () {
            return this.findAll('.treeView .tree li');
        };

        this.contentsPanelIndexTabItemAnchors = function () {
            return this.findAll('.treeView .tree li a');
        };

        this.contentsPanelIndexTabTreeExpansionToggles = function () {
            return this.findAll('.treeView .tree li div.toggle');
        };

        this.contentsPanelIndexTabTreeExpandedToggles = function () {
            return this.findAll('.treeView .tree li div.toggle.expanded');
        };

        this.contentsPanelIndexTabSubTrees = function () {
            return this.findAll('.treeView .tree li ul');
        };

        this.contentsPanelThumbnailIncreaseSizeButton = function () {
            return this.find('.leftPanel .galleryView .btn.size-up');
        };

        this.contentsPanelThumbnailDecreaseSizeButton = function () {
            return this.find('.leftPanel .galleryView .btn.size-down');
        };

        this.contentsPanelExpandThumbnailsButton = function () {
            return this.find('.leftPanel > .top > a.expandFullButton');
        };

        this.contentsPanelCollapseThumbnailsButton = function () {
            return this.find('.leftPanel > .top > div.collapseButton');
        };

        this.contentsPanelLoadedImages = function () {
            return this.findAll('.wrap.loaded > img');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnail = function () {
            return this.find('.thumbsView .thumb.selected');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnail = function () {
            return this.find('.galleryView .thumb.selected');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnailLabels = function () {
            return this.findAll('.thumbsView .thumb.selected > .label');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnailLabels = function () {
            return this.findAll('.galleryView .thumb.selected > .label');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnailLabel = function () {
            return this.find('.thumbsView .thumb.selected > .label');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnailLabel = function () {
            return this.find('.galleryView .thumb.selected > .label');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnailWrap = function () {
            return this.find('.thumbsView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnailWrap = function () {
            return this.find('.galleryView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelNonExpandedSelectedLoadedThumbnails = function () {
            return this.findAll('.thumbsView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelExpandedSelectedLoadedThumbnails = function () {
            return this.findAll('.galleryView .thumb.selected > .wrap.loaded');
        };

        this.contentsPanelNonExpandedFrame = function () {
            return this.find('.thumbsView');
        };

        this.contentsPanelExpandedFrame = function () {
            return this.find('.galleryView');
        };

        this.contentsPanelNonExpandedThumbnails = function () {
            return this.findAll('.thumbsView .thumb');
        };

        this.contentsPanelExpandedThumbnails = function () {
            return this.findAll('.galleryView .thumb');
        };
    }
    /* END OF CONTENTS PANEL */

    /* CENTER PANEL */
    {
        this.centerPanelRightsNoticeTitle = function () {
            return this.find('.centerPanel .rights .header .title');
        };

        this.centerPanelRightsNoticeAttribution = function () {
            return this.find('.centerPanel .rights .main .attribution');
        };

        this.centerPanelRightsNoticeAttributionMoreToggle = function () {
            return this.find('.centerPanel .rights .main .attribution a.toggle');
        };

        this.centerPanelRightsNoticeAttributionMoreButton = function () {
            return this.find('.centerPanel .rights .main .attribution a.toggle.more');
        };

        this.centerPanelRightsNoticeAttributionLessButton = function () {
            return this.find('.centerPanel .rights .main .attribution a.toggle.less');
        };

        this.centerPanelRightsNoticeLicense = function () {
            return this.find('.centerPanel .rights .main .license');
        };

        this.centerPanelRightsNoticeLogo = function () {
            return this.find('.centerPanel .rights .main .logo');
        };
    }
    /* END OF CENTER PANEL */

    /* LANGUAGE SELECTION */
    {
        this.localeMenu = function() {
            return this.find("#locale");
        };
    }
    /* END OF LANGUAGE SELECTION */

    /* EMBEDDING */
    {
        this.embedButton = function () {
            return this.find('.footerPanel .options .imageBtn.embed');
        };

        this.embedOverlayContent = function() {
            return this.find('.overlays .overlay.embed .middle .content > p');
        }
    }
    /* END OF EMBEDDING */

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

        this.selectLocale = function(locale, protractorCallback, continuation) {
            if(this.showdebug) { console.log('selecting locale ' + locale); }
            var that = this;
            that.resetFrame(
                function() {
                    that.settingsButton().then(
                        function(settingsButton) {
                            settingsButton.click().then(
                                function() {
                                    that.resetFrame(
                                        function () {
                                            that.localeMenu().then(
                                                function(localeMenu) {
                                                    localeMenu.click().then(
                                                        function() {
                                                            element(protractor.By.css("#locale option[value='" + locale + "']")).then(
                                                                function(localeOption) {
                                                                    localeOption.click().then(
                                                                        continuation,
                                                                        function() {
                                                                            protractorCallback.fail('could not click localeOption');
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
                        if(that.showdebug) { console.log('clicking index tab'); }
                        contentsPanelIndexTab.click().then(
                            function () {
                                if(that.showdebug) { console.log('clicked index tab'); }
                                that.resetFrame(
                                    function() {
                                        that.sleep(that.reactionDelay).then(
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
                that.canvasZoomInButton().then(
                    function(canvasZoomInButton) {
                        canvasZoomInButton.click().then(
                            function() {
                                that.sleep(that.reactionDelay).then(
                                    continuation
                                );
                            },
                            function() {
                                protractorCallback.fail('could not click canvasZoomInButton');
                            });
                    },
                    function() {
                        protractorCallback.fail('could not find canvasZoomInButton');
                    });
            });
    };

    this.zoomOutImage = function(protractorCallback, continuation) {
        if(that.showdebug) { console.log('zooming out image'); }
        that.resetFrame(
            function() {
                that.canvasZoomOutButton().then(
                    function(canvasZoomOutButton) {
                        canvasZoomOutButton.click().then(
                            function() {
                                that.sleep(that.reactionDelay).then(
                                    continuation
                                );
                            },
                            function() {
                                protractorCallback.fail('could not click canvasZoomOutButton');
                            });
                    },
                    function() {
                        protractorCallback.fail('could not find canvasZoomOutButton');
                    });
            });
    };

    this.getZoomLevel = function(protractorCallback, continuation) {
        if(that.showdebug) { console.log('getting current zoom level'); }
        ptor.getCurrentUrl().then(
            function(currentUrl) {
                if(that.showdebug) { console.log('current url = ' + currentUrl); }
                var zoomLevel = currentUrl.substring(currentUrl.indexOf("&z="));
                continuation(zoomLevel);
            },
            function() {
                protractorCallback.fail('could not get current url');
            });
    };

};

module.exports = ViewerPage;