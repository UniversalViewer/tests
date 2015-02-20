var ViewerPage = require("../PageObjects/ViewerPage.js");
var LanguageLookup = require("../support/LanguageLookup.js");

var myStepDefinitionsWrapper = function () {

    var ptor = browser;
    var vp = new ViewerPage();

    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    var languageLookup = new LanguageLookup();

    var originalAttributionTextLength;

    var thumbnailPanelWidth;
    var thumbnailWidth;

    var currentZoomLevel;

    /* VIEWING */
    {
        this.Given(/^the user is viewing the Viewer$/, function (callback) {
            if(showsteps) { console.log('Given the user is viewing the Viewer'); }
            vp.startCanvas().then(
                function(startCanvas) {
                    if(showdebug) { console.log('got canvas elements'); }
                    callback();
                },
                function() {
                    callback.fail('no seadragon canvas elements');
                });
        });

        this.Given(/^the user is viewing the Viewer in its last page$/, function (callback) {
            if(showsteps) { console.log('Given the user is viewing the Viewer in its last page'); }
            vp.resetFrame(
                function() {
                    vp.navigationLastButton().then(
                        function (lastButton) {
                            lastButton.click().then(
                                callback,
                                function() {
                                    callback.fail('clicking navigation last item button failed');
                                });
                        },
                        function () {
                            callback.fail("button last page not found");
                        });
                });
        });

        this.Given(/^the user is viewing the Viewer on its very first page$/, function (callback) {
            if(showsteps) { console.log('Given the user is viewing the Viewer on its very first page'); }
            vp.resetFrame(
                function() {
                    vp.navigationFirstButton().then(
                        function(firstButton){
                            firstButton.click().then(
                                callback,
                                function() {
                                    callback.fail('clicking navigation first item button failed');
                                });
                        },
                        function(){
                            callback.fail('navigation first item button not found');
                        });
                });
        });

        this.Given(/^the user is viewing the Viewer on page (.*)$/, function (arg1, callback) {
            if(showsteps) { console.log('Given the user is viewing the Viewer on page ' + arg1); }
            vp.switchPage(arg1, callback);
        });

        this.Given(/^the Viewer is in one-up mode$/, function(callback) {
            if(showsteps) { console.log('Given the Viewer is in one-up mode'); }
            vp.enterOneUpMode(callback, callback);
        });

        this.Given(/^the Viewer is in full screen mode$/, function (callback) {
            if(showsteps) { console.log('Given the Viewer is in full screen mode'); }
            vp.resetFrame(
                function() {
                    vp.fullScreenButton().then(
                        function (fullScreenButton) {
                            fullScreenButton.click().then(
                                callback,
                                function() {
                                    callback.fail('clicking full screen button failed');
                                });
                        },
                        function () {
                            if(showdebug) { console.log('could not find full screen button so must be in full screen mode already'); }
                            callback();
                        });
                });
        });
    }
    /* END OF VIEWING */

    /* CONTENTS */
    {
        this.Given(/^the CONTENTS panel is visible$/, function(callback) {
            if(showsteps) { console.log('Given the CONTENTS panel is visible'); }
            vp.clickContents(callback);
        });

        this.Given(/^the CONTENTS panel is collapsed$/, function(callback) {
            if(showsteps) { console.log('Given the CONTENTS panel is collapsed'); }
            vp.clickContentsCollapse(callback, callback);
        });

        this.Then(/^the CONTENTS panel is visible to the user$/, function(callback) {
            if(showsteps) { console.log('Then the CONTENTS panel is visible to the user'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelCollapseThumbnailsButton().then(
                        function(contentsPanelCollapseThumbnailsButton) {
                            contentsPanelCollapseThumbnailsButton.isDisplayed().then(
                                function (contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                    if (contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                        callback();
                                    } else {
                                        callback.fail('contentsPanelCollapseThumbnailsButton is not displayed');
                                    }
                                });
                        },
                        function() {
                            callback.fail('could not find contentsPanelCollapseThumbnailsButton');
                        });
                });
        });

        this.Then(/^the CONTENTS panel is not visible to the user$/, function(callback) {
            if(showsteps) { console.log('Then the CONTENTS panel is not visible to the user'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelCollapseThumbnailsButton().then(
                        function(contentsPanelCollapseThumbnailsButton) {
                            contentsPanelCollapseThumbnailsButton.isDisplayed().then(
                                function (contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                    if (!contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                        callback();
                                    } else {
                                        callback.fail('contentsPanelCollapseThumbnailsButton was displayed so CONTENTS panel is visible');
                                    }
                                });
                        },
                        function() {
                            callback.fail('could not find contentsPanelCollapseThumbnailsButton');
                        });
                });
        });
    }
    /* END OF CONTENTS */

    /* POPUPS */
    {
        this.Then(/^a pop up is displayed to the user$/, function (arg1, callback) {
            if(showsteps) { console.log('Then a pop up is displayed to the user'); }
            vp.resetFrame(
                function() {
                    vp.overlayGenericDialogueMiddleContent().then(
                        function(popupContent) {
                            popupContent.getText().then(
                                function(popupText) {
                                    if(popupText.length > 0) {
                                        callback();
                                    } else {
                                        callback.fail('Text not found in pop up.');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of overlay generic dialogue middle content');
                                });
                        },
                        function(){
                            callback.fail('Pop up not found.');
                        });
                });
        });
    }
    /* END OF POPUPS */

    /* TWO-UP VIEW */
    {
        this.Then(/^two pages are displayed to the user$/, function (callback) {
            if (showsteps) {
                console.log('Then two pages are displayed to the user');
            }
            vp.resetFrame(
                function () {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnails().then(
                        function (contentsPanelSelectedLoadedThumbnails) {
                            if (contentsPanelSelectedLoadedThumbnails.length == 2) {
                                callback();
                            } else {
                                callback.fail('2 thumbnails should be selected');
                            }
                        },
                        function () {
                            callback.fail('could not find contents panel selected loaded thumbnails')
                        });
                });
        });
    }
    /* END OF TWO-UP VIEW */

    /* ELIDING */
    {
        this.Then(/^they see that a long title is elided appropriately$/, function (callback) {
            if(showsteps) { console.log('Then they see that a long title is elided appropriately'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.contentsPanelIndexTabItems().then(
                        function(contentsPanelIndexTabItems) {
                            contentsPanelIndexTabItems[1].getText().then(
                                function(indexItemText) {
                                    if(that.endsWith(indexItemText, '…')) {
                                        callback();
                                    } else {
                                        callback.fail('could not find ellipsis character');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of index item');
                                });
                        },
                        function() {
                            callback.fail('could not find contents panel index items');
                        });
                });
        });

        this.Then(/^they see that a long title has a tooltip that is elided appropriately$/, function(callback) {
            if(showsteps) { console.log('Then they see that a long title has a tooltip that is elided appropriately'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.contentsPanelIndexTabItemAnchors().then(
                        function(contentsPanelIndexTabItemAnchors) {
                            contentsPanelIndexTabItemAnchors[1].getText().then(
                                function(indexItemText) {
                                    if(that.endsWith(indexItemText, '…')) {
                                        if(that.showdebug) { console.log('found ellipsis on visible text'); }
                                        contentsPanelIndexTabItemAnchors[1].getAttribute('title').then(
                                            function(titleText) {
                                                if(titleText.length > indexItemText.length) {
                                                    if(that.showdebug) { console.log('title text is longer than visible text'); }
                                                    callback();
                                                } else {
                                                    callback.fail('title text for long title is shorter or equal to visible text');
                                                }
                                            });
                                    } else {
                                        callback.fail('could not find ellipsis character on visible text of long title');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of index item');
                                });
                        },
                        function() {
                            callback.fail('could not find contents panel index items');
                        });
                });
        });
    }
    /* END OF ELIDING */

    /* EMBEDDING */
    {
        this.When(/^they choose to see the embedding options$/, function(callback) {
            if(showsteps) { console.log('When they choose to see the embedding options'); }
            vp.resetFrame(
                function() {
                    vp.embedButton().then(
                        function(embedButton) {
                            embedButton.click().then(
                                callback,
                                function() {
                                    callback.fail('could not click embedButton');
                                });
                        },
                        function() {
                            callback.fail('could not find embedButton');
                        });
                });
        });
    }
    /* END OF EMBEDDING */

    /* HIERARCHICAL INDEX */
    {
        this.Given(/^the user is Viewing the books index$/, function (callback) {
            if(showsteps) { console.log('Given the user is Viewing the books index'); }
            vp.clickContentsIndexTab(callback, callback);
        });

        this.When(/^the user is viewing the CONTENTS panel INDEX tab$/, function(callback) {
            if(showsteps) { console.log('When the user is viewing the CONTENTS panel INDEX tab'); }
            vp.clickContentsIndexTab(callback, callback);
        });

        this.Then(/^they see an expandable tree view$/, function (callback) {
            if(showsteps) { console.log('Then they see an expandable tree view'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelIndexTabTreeExpansionToggles().then(
                        function(toggles) {
                            if(toggles.length > 0) {
                                callback();
                            } else {
                                callback.fail('Hierarchy not found (test found zero length array of toggle components)');
                            }
                        },
                        function() {
                            callback.fail('Hierarchy not found');
                        });
                });
        });

        this.When(/^the user click on the expand view button$/, function (callback) {
            if (showsteps) { console.log('When the user click on the expand view button'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelIndexTabTreeExpansionToggles().then(
                        function (toggles){
                            toggles[0].click().then(
                                callback,
                                function() {
                                    callback.fail('clicking contents panel expand tree toggle failed');
                                });
                        },
                        function() {
                            callback.fail('could not find contents panel index tab tree expansion toggles');
                        });
                });
        });

        this.Then(/^the index appears indented$/, function (callback) {
            if(showsteps) { console.log('Then the index appears indented'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelIndexTabSubTrees().then(
                        function(contentsPanelIndexTabSubTrees) {
                            if (contentsPanelIndexTabSubTrees.length > 0) {
                                callback();
                            } else {
                                callback.fail('Indentation not found (zero length list of ul components)');
                            }
                        },
                        function() {
                            callback.fail('Indentation not found');
                        });
                });
        });

        this.When(/^the user expands the whole hierarchy$/, function(callback) {
            if(showsteps) { console.log('When the user expands the whole hierarchy'); }
            vp.recursivelyExpandIndexItems(callback, callback);
        });

        this.Then(/^they see no more expand view buttons$/, function(callback) {
            if(showsteps) { console.log('Then they see no more expand view buttons'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelIndexTabTreeExpandedToggles().then(
                        function(contentsPanelIndexTabTreeExpandedToggles) {
                            vp.contentsPanelIndexTabTreeExpansionToggles().then(
                                function(contentsPanelIndexTabTreeExpansionToggles) {
                                    if(contentsPanelIndexTabTreeExpansionToggles.length > contentsPanelIndexTabTreeExpandedToggles.length) {
                                        callback.fail('still seeing toggles left to expand');
                                    } else {
                                        // empty list - success
                                        callback();
                                    }
                                },
                                function() {
                                    callback.fail('could not find any expansion toggles');
                                });
                        },
                        // no elements found - success
                        callback
                    );
                });
        });
    }
    /* END OF HIERARCHICAL INDEX */

    /* LOCALISATION */
    {
        this.Given(/^the user is viewing the Viewer in (\w+)$/, function(languageName, callback) {
            if(showsteps) { console.log('Given the user is viewing the Viewer in ' + languageName); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            if(showdebug) { console.log('language code = ' + languageCode); }
            vp.selectLocale(languageCode, callback, callback);
        });

        this.Given(/^the user is viewing the Viewer in (\w+) on page (.*)$/, function (languageName, pageIdentifier, callback) {
            if(showsteps) { console.log('Given the user is viewing the Viewer in ' + languageName + ' on page ' + pageIdentifier); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            if(showdebug) { console.log('language code = ' + languageCode); }
            vp.selectLocale(languageCode, callback, function() {
                vp.switchPage(pageIdentifier, callback, callback);
            });
        });

        this.When(/^they choose to display the language test page$/, function(callback) {
            if(showsteps) { console.log('When they choose to display the language test page'); }
            callback.pending();
        });

        this.When(/^they change language to (\w+)$/, function(languageName, callback) {
            if(showsteps) { console.log('When they change language to ' + languageName); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            if(showdebug) { console.log('language code = ' + languageCode); }
            vp.selectLocale(languageCode, callback, callback);
        });

        /* LANGUAGE SPECIFIC CHARACTERS */
        this.Then(/^they see special characters in the search option label$/, function(callback) {
            if(showsteps) { console.log('Then they see special characters in the search option label'); }
            vp.resetFrame(
                function() {
                    vp.searchImageLabel().then(
                        function(searchImageLabel) {
                            searchImageLabel.getText().then(
                                function(searchImageLabelText) {
                                    if(searchImageLabelText.indexOf("?") > -1) {
                                        callback();
                                    } else {
                                        callback.fail('could not find special characters within text of searchImageLabel');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of searchImageLabel');
                                });
                        },
                        function() {
                            callback.fail('could not find searchImageLabel');
                        });
                });
        });

        this.Then(/^they see (\w+) characters in the embedding options content$/, function(languageName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' characters in the embedding options content'); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            vp.resetFrame(
                function() {
                    vp.embedOverlayContent().then(
                        function(embedOverlayContent) {
                            embedOverlayContent.getText().then(
                                function(embedOverlayContentText) {
                                    if(languageLookup.containsSpecialChars(embedOverlayContentText, languageCode)) {
                                        callback();
                                    } else {
                                        callback.fail('could not find special character in the text of embedOverlayContent');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of embedOverlayContent');
                                });
                        },
                        function() {
                            callback.fail('could not find embedOverlayContent');
                        });
                });
        });
        /* END OF LANGUAGE SPECIFIC CHARACTERS */

        /* LANGUAGE SUPPORT IN MANIFEST */
        this.Then(/^the selected thumbnail title reads \"(.*?)\"$/, function(text, callback) {
            if(showsteps) { console.log('Then the selected thumbnail title reads "' + text + '"'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabel().then(
                        function(contentsPanelNonExpandedSelectedLoadedThumbnailLabel) {
                            contentsPanelNonExpandedSelectedLoadedThumbnailLabel.getText().then(
                                function(contentsPanelNonExpandedSelectedLoadedThumbnailLabelText) {
                                    if(contentsPanelNonExpandedSelectedLoadedThumbnailLabelText == text) {
                                        callback();
                                    } else {
                                        callback.fail('text of contentsPanelNonExpandedSelectedLoadedThumbnailLabel did not match');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabel');
                                });
                        },
                        function() {
                            callback.fail('could not find contentsPanelNonExpandedSelectedLoadedThumbnailLabel');
                        });
                });
        });

        this.Then(/^they see (\w+) text for the selected thumbnail title$/, function(languageName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' text for the selected thumbnail title'); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            var languageFallback = languageLookup.getLanguageFallback(languageCode);
            vp.resetFrame(
                function() {
                    vp.getTextOfElement(vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabel(), callback, function(text) {
                        if(text.indexOf(languageCode) > 0) {
                            if (showdebug) { console.log('matched exact language code ' + languageCode); }
                            callback();
                        } else if(text.indexOf(languageFallback) > 0) {
                            if (showdebug) { console.log('matched fallback language code ' + languageFallback); }
                            callback();
                        } else {
                            if (showdebug) { console.log('unmatched text ' + text); }
                            callback.fail('text of contentsPanelNonExpandedSelectedLoadedThumbnailLabel did not match');
                        }});
                });
        });

        this.Then(/^they see (\w+) text for the selected item in the hierarchical index$/, function(languageName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' text for the selected item in the hierarchical index'); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            var languageFallback = languageLookup.getLanguageFallback(languageCode);
            vp.resetFrame(
                function() {
                    vp.getTextOfElement(vp.contentsPanelIndexTabItemSelected(), callback, function(text) {
                        if(text.indexOf(languageCode) > 0) {
                            if (showdebug) { console.log('matched exact language code ' + languageCode); }
                            callback();
                        } else if(text.indexOf(languageFallback) > 0) {
                            if (showdebug) { console.log('matched fallback language code ' + languageFallback); }
                            callback();
                        } else {
                            if (showdebug) { console.log('unmatched text ' + text); }
                            callback.fail('text of contentsPanelIndexTabItemSelected did not match');
                        }});
                });
        });

        this.Then(/^they see (\w+) text for the current page identifier$/, function(languageName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' text for the current page identifier'); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            var languageFallback = languageLookup.getLanguageFallback(languageCode);
            vp.resetFrame(
                function() {
                    vp.getValueOfElement(vp.searchText(), callback, function(text) {
                        if(text.indexOf(languageCode) > 0) {
                            if (showdebug) { console.log('matched exact language code ' + languageCode); }
                            callback();
                        } else if(text.indexOf(languageFallback) > 0) {
                            if (showdebug) { console.log('matched fallback language code ' + languageFallback); }
                            callback();
                        } else {
                            if (showdebug) { console.log('unmatched text ' + text); }
                            callback.fail('text of searchText did not match');
                        }});
                });
        });

        this.Then(/^they see (\w+) text for the metadata label named (\w+)$/, function(languageName, labelName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' text for the metadata label named ' + labelName); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            var languageFallback = languageLookup.getLanguageFallback(languageCode);
            vp.resetFrame(
                function() {
                    vp.getTextOfElement(vp.moreInformationPanelMetaDataLabel(labelName), callback, function(text) {
                        if(text.indexOf(languageCode) > 0) {
                            if (showdebug) { console.log('matched exact language code ' + languageCode); }
                            callback();
                        } else if(text.indexOf(languageFallback) > 0) {
                            if (showdebug) { console.log('matched fallback language code ' + languageFallback); }
                            callback();
                        } else {
                            if (showdebug) { console.log('unmatched text ' + text); }
                            callback.fail('text of moreInformationPanelMetaDataLabel did not match');
                        }});
                });
        });

        this.Then(/^they see (\w+) text for the metadata value named (\w+)$/, function(languageName, labelName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' text for the metadata value named ' + labelName); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            var languageFallback = languageLookup.getLanguageFallback(languageCode);
            vp.resetFrame(
                function() {
                    vp.getTextOfElement(vp.moreInformationPanelMetaDataValue(labelName), callback, function(text) {
                        if(text.indexOf(languageCode) > 0) {
                            if (showdebug) { console.log('matched exact language code ' + languageCode); }
                            callback();
                        } else if(text.indexOf(languageFallback) > 0) {
                            if (showdebug) { console.log('matched fallback language code ' + languageFallback); }
                            callback();
                        } else {
                            if (showdebug) { console.log('unmatched text ' + text); }
                            callback.fail('text of moreInformationPanelMetaDataValue did not match');
                        }});
                });
        });

        this.Then(/^they see (\w+) text for the work title$/, function(languageName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' text for the work title'); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            var languageFallback = languageLookup.getLanguageFallback(languageCode);
            vp.resetFrame(
                function() {
                    vp.getTextOfElement(vp.centerPanelWorkTitleSpan(), callback, function(text) {
                        if(text.indexOf(languageCode) > 0) {
                            if (showdebug) { console.log('matched exact language code ' + languageCode); }
                            callback();
                        } else if(text.indexOf(languageFallback) > 0) {
                            if (showdebug) { console.log('matched fallback language code ' + languageFallback); }
                            callback();
                        } else {
                            if (showdebug) { console.log('unmatched text ' + text); }
                            callback.fail('text of centerPanelWorkTitleSpan did not match');
                        }});
                });
        });

        this.Then(/^they see (\w+) text for the attribution notice$/, function(languageName, callback) {
            if(showsteps) { console.log('Then they see ' + languageName + ' text for the attribution notice'); }
            var languageCode = languageLookup.getLanguageCode(languageName);
            var languageFallback = languageLookup.getLanguageFallback(languageCode);

            vp.resetFrame(
                function() {
                    vp.getTextOfElement(vp.centerPanelRightsNoticeLicense(), callback, function(text) {
                        if(text.indexOf(languageCode) > 0) {
                            if (showdebug) { console.log('matched exact language code ' + languageCode); }
                            callback();
                        } else if(text.indexOf(languageFallback) > 0) {
                            if (showdebug) { console.log('matched fallback language code ' + languageFallback); }
                            callback();
                        } else {
                            if (showdebug) { console.log('unmatched text ' + text); }
                            callback.fail('text of centerPanelRightsNoticeLicense did not match');
                        }});
                });
        });
        /* END OF LANGUAGE SUPPORT IN MANIFEST */
    }
    /* END OF LOCALISATION */

    /* LEFT-TO-RIGHT MANIFESTS */
    {
        this.Then(/^the first thumbnail of a left to right manifest is selected$/, function (callback) {
            if (showsteps) { console.log('Then the first thumbnail of a left to right manifest is selected'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabel().then(
                        function(label) {
                            label.getText().then(
                                function(text) {
                                    text = text.replace(/ /g, '');
                                    if(text == 'FrontCover') {
                                        callback();
                                    } else {
                                        callback.fail('selected thumbnail is not first page');
                                    }
                                },
                                function()
                                {
                                    callback.fail('could not get text of selected thumbnail label');
                                });
                        },
                        function() {
                            callback.fail('could not get selected loaded thumbnail label')
                        });
                });
        });

        this.Then(/^the first thumbnail of a left to right manifest is arranged correctly$/, function(callback) {
            if(showsteps) { console.log('And the first thumbnail of a left to right manifest is arranged correctly'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelNonExpandedFrame().then(
                        function(contentsPanelNonExpandedFrame) {
                            contentsPanelNonExpandedFrame.getLocation().then(
                                function(contentsPanelNonExpandedFrameLocation) {
                                    if(showdebug) { console.log('thumbsViewX = ' + contentsPanelNonExpandedFrameLocation.x); }
                                    vp.resetFrame(
                                        function() {
                                            vp.getThumbnailWidthInNonExpandedView(
                                                function(thumbWidth) {
                                                    if(showdebug) { console.log('thumb width = ' + thumbWidth); }
                                                    vp.resetFrame(
                                                        function() {
                                                            vp.contentsPanelNonExpandedSelectedLoadedThumbnail().then(
                                                                function(contentsPanelNonExpandedSelectedLoadedThumbnail) {
                                                                    contentsPanelNonExpandedSelectedLoadedThumbnail.getLocation().then(
                                                                        function(contentsPanelNonExpandedSelectedLoadedThumbnailLocation) {
                                                                            if(showdebug) { console.log('selected thumb x = ' + contentsPanelNonExpandedSelectedLoadedThumbnailLocation.x); }
                                                                            var originPlusWidth = contentsPanelNonExpandedFrameLocation.x + parseInt(thumbWidth);
                                                                            if(showdebug) { console.log('origin + width = ' + originPlusWidth); }
                                                                            if(contentsPanelNonExpandedSelectedLoadedThumbnailLocation.x > originPlusWidth) {
                                                                                callback();
                                                                            } else {
                                                                                callback.fail('first selected thumbnail was in wrong position');
                                                                            }
                                                                        },
                                                                        function() {
                                                                            callback.fail('could not get non-expanded selected loaded thumbnail location');
                                                                        });
                                                                },
                                                                function() {
                                                                    callback.fail('could not get non-expanded selected loaded thumbnail');
                                                                });
                                                        });
                                                },
                                                callback);
                                        });
                                },
                                function() {
                                    callback.fail('could not get non-expanded thumbnail view location');
                                });
                        },
                        function() {
                            callback.fail('could not find non-expanded thumbnail view');
                        });
                });
        });

        this.Then(/^the second and third thumbnails of a left to right manifest are selected$/, function(callback) {
            if(showsteps) { console.log('Then the second and third thumbnails of a left to right manifest are selected'); }
            vp.resetFrame(
                function () {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                        function (contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                            if (contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                    function(text1) {
                                        text1 = text1.replace(/ /g,'');
                                        if(showdebug) { console.log('found label (' + text1 + ')'); }
                                        if(text1 == '1' || text1 == '2') {
                                            contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                                function(text2) {
                                                    text2 = text2.replace(/ /g,'');
                                                    if(showdebug) { console.log('found label (' + text2 + ')'); }
                                                    if(text2 == '1' || text2 == '2') {
                                                        callback();
                                                    } else {
                                                        callback.fail('incorrect page selected (' + text2 + ')');
                                                    }
                                                },
                                                function() {
                                                    callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                                }
                                            );
                                        } else {
                                            callback.fail('incorrect page selected (' + text1 + ')');
                                        }
                                    },
                                    function() {
                                        callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                    });
                            } else {
                                callback.fail('2 thumbnails should be selected');
                            }
                        },
                        function () {
                            callback.fail('could not find contents panel selected loaded thumbnails')
                        });
                });
        });

        this.Then(/^the second and third thumbnails of a left to right manifest are arranged correctly$/, function(callback) {
            if(showsteps) { console.log('Then the second and third thumbnails of a left to right manifest are arranged correctly'); }
            vp.resetFrame(
                function() {
                    new ViewerPage().contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                        function(contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                            if(contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                    function(text1) {
                                        text1 = text1.replace(/ /g, '');
                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                            function(text2) {
                                                text2 = text2.replace(/ /g, '');
                                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getLocation().then(
                                                    function(location1) {
                                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getLocation().then(
                                                            function(location2) {
                                                                var page2, page1;
                                                                if(text1 == '2') {
                                                                    page2 = location1.x;
                                                                    page1 = location2.x;
                                                                } else {
                                                                    page2 = location2.x;
                                                                    page1 = location1.x;
                                                                }
                                                                if(page2 > page1) {
                                                                    callback();
                                                                } else {
                                                                    callback.fail('page 2 is not on the right of page 1');
                                                                }
                                                            },
                                                            function() {
                                                                callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                                            });
                                                    },
                                                    function() {
                                                        callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                                    });
                                            },
                                            function() {
                                                callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                            });
                                    },
                                    function() {
                                        callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                    });
                            } else {
                                callback.fail('not enough thumbnails selected (should be 2, got ' + contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length + ')');
                            }
                        });
                });
        });
    }
    /* END OF LEFT-TO-RIGHT MANIFESTS */

    /* RIGHT-TO-LEFT MANIFESTS */
    {
        this.Then(/^the first thumbnail of a right to left manifest is selected$/, function (callback) {
            if (showsteps) { console.log('Then the first thumbnail of a right to left manifest is selected'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabel().then(
                        function(label) {
                            label.getText().then(
                                function(text) {
                                    text = text.replace(/ /g, '');
                                    if(text == '1r') {
                                        callback();
                                    } else {
                                        callback.fail('selected thumbnail is not first recto page');
                                    }
                                },
                                function()
                                {
                                    callback.fail('could not get text of selected thumbnail label');
                                });
                        },
                        function() {
                            callback.fail('could not get selected loaded thumbnail label')
                        });
                });
        });

        this.Then(/^the first thumbnail of a right to left manifest is arranged correctly$/, function(callback) {
            if(showsteps) { console.log('And the first thumbnail of a right to left manifest is arranged correctly'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelNonExpandedFrame().then(
                        function(contentsPanelNonExpandedFrame) {
                            contentsPanelNonExpandedFrame.getLocation().then(
                                function(contentsPanelNonExpandedFrameLocation) {
                                    if(showdebug) { console.log('thumbsViewX = ' + contentsPanelNonExpandedFrameLocation.x); }
                                    vp.resetFrame(
                                        function() {
                                            vp.getThumbnailWidthInNonExpandedView(
                                                function(thumbWidth) {
                                                    if(showdebug) { console.log('thumb width = ' + thumbWidth); }
                                                    vp.resetFrame(
                                                        function() {
                                                            vp.contentsPanelNonExpandedSelectedLoadedThumbnail().then(
                                                                function(contentsPanelNonExpandedSelectedLoadedThumbnail) {
                                                                    contentsPanelNonExpandedSelectedLoadedThumbnail.getLocation().then(
                                                                        function(contentsPanelNonExpandedSelectedLoadedThumbnailLocation) {
                                                                            if(showdebug) { console.log('selected thumb x = ' + contentsPanelNonExpandedSelectedLoadedThumbnailLocation.x); }
                                                                            var originPlusWidth = contentsPanelNonExpandedFrameLocation.x + parseInt(thumbWidth);
                                                                            if(showdebug) { console.log('origin + width = ' + originPlusWidth); }
                                                                            if(contentsPanelNonExpandedSelectedLoadedThumbnailLocation.x < originPlusWidth) {
                                                                                callback();
                                                                            } else {
                                                                                callback.fail('first selected thumbnail was in wrong position');
                                                                            }
                                                                        },
                                                                        function() {
                                                                            callback.fail('could not get non-expanded selected loaded thumbnail location');
                                                                        });
                                                                },
                                                                function() {
                                                                    callback.fail('could not get non-expanded selected loaded thumbnail');
                                                                });
                                                        });
                                                },
                                                callback);
                                        });
                                },
                                function() {
                                    callback.fail('could not get non-expanded thumbnail view location');
                                });
                        },
                        function() {
                            callback.fail('could not find non-expanded thumbnail view');
                        });
                });
        });

        this.Then(/^the second and third thumbnails of a right to left manifest are selected$/, function(callback) {
            if(showsteps) { console.log('Then the second and third thumbnails of a right to left manifest are selected'); }
            vp.resetFrame(
                function () {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                        function (contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                            vp.sleep(vp.reactionDelay).then(
                                function() {
                                    if (contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                            function(text1) {
                                                text1 = text1.replace(/ /g,'');
                                                if(showdebug) { console.log('found label (' + text1 + ')'); }
                                                if(text1 == '1v' || text1 == '2r') {
                                                    contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                                        function(text2) {
                                                            text2 = text2.replace(/ /g,'');
                                                            if(showdebug) { console.log('found label (' + text2 + ')'); }
                                                            if(text2 == '1v' || text2 == '2r') {
                                                                callback();
                                                            } else {
                                                                callback.fail('incorrect page selected (' + text2 + ')');
                                                            }
                                                        },
                                                        function() {
                                                            callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                                        }
                                                    );
                                                } else {
                                                    callback.fail('incorrect page selected (' + text1 + ')');
                                                }
                                            },
                                            function() {
                                                callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                            });
                                    } else {
                                        callback.fail('2 thumbnails should be selected');
                                    }
                                });
                        },
                        function () {
                            callback.fail('could not find contents panel selected loaded thumbnails')
                        });
                });
        });

        this.Then(/^the second and third thumbnails of a right to left manifest are arranged correctly$/, function(callback) {
            if(showsteps) { console.log('Then the second and third thumbnails of a right to left manifest are arranged correctly'); }
            vp.resetFrame(
                function() {
                    new ViewerPage().contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                        function(contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                            if(contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                    function(text1) {
                                        text1 = text1.replace(/ /g, '');
                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                            function(text2) {
                                                text2 = text2.replace(/ /g, '');
                                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getLocation().then(
                                                    function(location1) {
                                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getLocation().then(
                                                            function(location2) {
                                                                var page2r, page1v;
                                                                if(text1 == '2r') {
                                                                    page2r = location1.x;
                                                                    page1v = location2.x;
                                                                } else {
                                                                    page2r = location2.x;
                                                                    page1v = location1.x;
                                                                }
                                                                if(page2r < page1v) {
                                                                    callback();
                                                                } else {
                                                                    callback.fail('page 2r is not on the left of page 1v');
                                                                }
                                                            },
                                                            function() {
                                                                callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                                            });
                                                    },
                                                    function() {
                                                        callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                                    });
                                            },
                                            function() {
                                                callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                            });
                                    },
                                    function() {
                                        callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                    });
                            } else {
                                callback.fail('not enough thumbnails selected (should be 2, got ' + contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length + ')');
                            }
                        });
                });
        });
    }
    /* END OF RIGHT-TO-LEFT MANIFESTS */

    /* TOP-TO-BOTTOM MANIFESTS */
    {
        this.Then(/^the first thumbnail of a top to bottom manifest is selected$/, function (callback) {
            if (showsteps) { console.log('Then the first thumbnail of a top to bottom manifest is selected'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabel().then(
                        function(label) {
                            label.getText().then(
                                function(text) {
                                    text = text.replace(/ /g, '');
                                    if(text == '1r') {
                                        callback();
                                    } else {
                                        callback.fail('selected thumbnail is not first recto page');
                                    }
                                },
                                function()
                                {
                                    callback.fail('could not get text of selected thumbnail label');
                                });
                        },
                        function() {
                            callback.fail('could not get selected loaded thumbnail label')
                        });
                });
        });

        this.Then(/^the second and third thumbnails of a top to bottom manifest are selected$/, function(callback) {
            if(showsteps) { console.log('Then the second and third thumbnails of a top to bottom manifest are selected'); }
            vp.resetFrame(
                function () {
                    vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                        function (contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                            if (contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                    function(text1) {
                                        text1 = text1.replace(/ /g,'');
                                        if(showdebug) { console.log('found label (' + text1 + ')'); }
                                        if(text1 == '1v' || text1 == '2r') {
                                            contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                                function(text2) {
                                                    text2 = text2.replace(/ /g,'');
                                                    if(showdebug) { console.log('found label (' + text2 + ')'); }
                                                    if(text2 == '1v' || text2 == '2r') {
                                                        callback();
                                                    } else {
                                                        callback.fail('incorrect page selected (' + text2 + ')');
                                                    }
                                                },
                                                function() {
                                                    callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                                }
                                            );
                                        } else {
                                            callback.fail('incorrect page selected (' + text1 + ')');
                                        }
                                    },
                                    function() {
                                        callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                    });
                            } else {
                                callback.fail('2 thumbnails should be selected');
                            }
                        },
                        function () {
                            callback.fail('could not find contents panel selected loaded thumbnails')
                        });
                });
        });

        this.Then(/^the second and third thumbnails of a top to bottom manifest are arranged correctly$/, function(callback) {
            if(showsteps) { console.log('Then the second and third thumbnails of a top to bottom manifest are arranged correctly'); }
            vp.resetFrame(
                function() {
                    new ViewerPage().contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                        function(contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                            if(contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                    function(text1) {
                                        text1 = text1.replace(/ /g, '');
                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                            function(text2) {
                                                text2 = text2.replace(/ /g, '');
                                                contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getLocation().then(
                                                    function(location1) {
                                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getLocation().then(
                                                            function(location2) {
                                                                var page2r, page1v;
                                                                if(text1 == '2r') {
                                                                    page2r = location1.y;
                                                                    page1v = location2.y;
                                                                } else {
                                                                    page2r = location2.y;
                                                                    page1v = location1.y;
                                                                }
                                                                if(page2r > page1v) {
                                                                    callback();
                                                                } else {
                                                                    callback.fail('page 2r is not below page 1v');
                                                                }
                                                            },
                                                            function() {
                                                                callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                                            });
                                                    },
                                                    function() {
                                                        callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                                    });
                                            },
                                            function() {
                                                callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                            });
                                    },
                                    function() {
                                        callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                    });
                            } else {
                                callback.fail('not enough thumbnails selected (should be 2, got ' + contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length + ')');
                            }
                        });
                });
        });
    }
    /* END OF TOP-TO-BOTTOM MANIFESTS */

    /* METADATA */
    {
        this.Given(/^the MORE INFORMATION panel is visible$/, function(callback) {
            if(showsteps) { console.log('Given the MORE INFORMATION panel is visible'); }
            vp.clickMoreInformation(callback, callback);
        });

        this.When(/^they click MORE INFORMATION$/, function (callback) {
            if(showsteps) { console.log('When they click MORE INFORMATION'); }
            vp.clickMoreInformation(callback, callback);
        });

        this.Then(/^metadata key\/value pairs are displayed to the user$/, function (callback) {
            if(showsteps) { console.log('Then metadata key\/value pairs are displayed to the user'); }
            vp.resetFrame(
                function() {
                    vp.sleep(vp.reactionDelay).then(
                        function() {
                            vp.moreInformationHeaders().then(
                                function (moreInformationHeaders) {
                                    if (moreInformationHeaders.length > 0) {
                                        vp.resetFrame(
                                            function() {
                                                vp.moreInformationTexts().then(
                                                    function (moreInformationTexts) {
                                                        if (moreInformationTexts.length > 0) {
                                                            callback();
                                                        } else {
                                                            callback.fail('more information texts was empty');
                                                        }
                                                    },
                                                    function() {
                                                        callback.fail('could not find more information texts');
                                                    });
                                            });
                                    } else {
                                        callback.fail('more information header array is empty');
                                    }
                                }, function () {
                                    callback.fail('more information header not found');
                                });
                        });
                });
        });

        this.Then(/^the metadata side panel is visible to the user$/, function (callback) {
            if(showsteps) { console.log('Then the metadata side panel is visible to the user'); }
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelExpandButton().then(
                        function(moreInformationPanelExpandButton) {
                            moreInformationPanelExpandButton.isDisplayed().then(
                                function(isDisplayed) {
                                    if(!isDisplayed) {
                                        callback();
                                    } else {
                                        callback.fail('moreInformationPanelExpandButton was displayed so MORE INFORMATION panel is not expanded');
                                    }
                                });
                        },
                        function() {
                            callback.fail('moreInformationPanelExpandButton not found');
                        });
                });
        });
    }
    /* END OF METADATA */

    /* NAVIGATION */
    {
        this.When(/^they click the Next arrow button$/, function (callback) {
            if(showsteps) { console.log('When they click the Next arrow button'); }
            vp.resetFrame(
                function() {
                    vp.navigationNextButton().then(
                        function(nextButton) {
                            nextButton.click().then(
                                callback,
                                function() {
                                    callback.fail('clicking next failed');
                                });
                        },
                        function(){
                            callback.fail("button next not found");
                        });
                });
        });

        this.When(/^they click the Previous arrow button$/, function (callback) {
            if(showsteps) { console.log('When they click the Previous arrow button'); }
            vp.resetFrame(
                function() {
                    vp.navigationPrevButton().then(
                        function (prevButton) {
                            prevButton.click().then(
                                callback,
                                function() {
                                    callback.fail('clicking prev failed');
                                });
                        },
                        function () {
                            callback.fail("button next not found");
                        });
                });
        });

        this.Then(/^the content of the page (.*?) is displayed to the user$/, function (arg1, callback) {
            if(showsteps) { console.log('Then the content of the page "' + arg1 + '" is displayed to the user'); }
            vp.resetFrame(
                function() {
                    vp.selectedThumbnailLabels().then(
                        function (labels) {
                            for(i = 0; i < labels.length; i++){
                                var label = labels[i];
                                label.getText().then(
                                    function (labelText) {
                                        this.counter = 0;
                                        labelText = labelText.trim();
                                        if(labelText == arg1) {
                                            callback();
                                        } else {
                                            this.counter++;
                                            if(counter == labels.length) {
                                                callback.fail("Expected labelText(" + labelText + ") to be equal to (" + arg1 + ")");
                                            }
                                        }
                                    },
                                    function() {
                                        callback.fail('get label text failed');
                                    });
                            }
                        },
                        function () {
                            callback.fail("incorrect page label");
                        });
                });
        });

        this.Then(/^the Previous arrow button is disabled$/, function (callback) {
            if(showsteps) { console.log('Then the Previous arrow button is disabled'); }
            vp.resetFrame(
                function() {
                    vp.sleep(vp.reactionDelay).then(
                        function() {
                            vp.navigationPrevDisabledButton().then(
                                function(disabledNavigationPrevButton) {
                                    vp.resetFrame(
                                        function() {
                                            vp.canvasPrevDisabledButton().then(
                                                function(disabledCanvasPrevButton) {
                                                    callback();
                                                },
                                                function() {
                                                    callback.fail('Canvas previous page arrow should be disabled');
                                                });
                                        });
                                },
                                function() {
                                    callback.fail('Previous button should be disabled');
                                });
                        });
                });
        });

        this.Then(/^the Next arrow is disabled$/, function (callback) {
            if(showsteps) { console.log('Then the Next arrow is disabled'); }
            vp.resetFrame(
                function() {
                    vp.sleep(vp.reactionDelay).then(
                        function() {
                            vp.navigationNextDisabledButton().then(
                                function (disabledNavigationNextButton) {
                                    vp.resetFrame(
                                        function() {
                                            vp.canvasNextDisabledButton().then(
                                                function(disabledCanvasNextButton) {
                                                    callback();
                                                },
                                                function () {
                                                    callback.fail('Canvas next page arrow should be disabled');
                                                });
                                        });
                                },
                                function () {
                                    callback.fail('Next button should be disabled');
                                });
                        });
                });
        });

        this.When(/^they go to the page (\d+)$/, function (arg1, callback) {
            if(showsteps) { console.log('When they go to the page '+ arg1); }
            vp.resetFrame(
                function() {
                    vp.searchText().then(
                        function (searchText) {
                            searchText.clear();
                            searchText.sendKeys(arg1);
                            vp.resetFrame(
                                function() {
                                    vp.goButton().then(
                                        function (goButton) {
                                            goButton.click().then(
                                                callback,
                                                function() {
                                                    callback.fail('clicking go button failed');
                                                });
                                        },
                                        function () {
                                            callback.fail("button go not found");
                                        });
                                });
                        },
                        function () {
                            callback.fail("page search text box not found");
                        });
                });
        });

        this.Then(/^the image is labeled with page (\d+)$/, function (arg1, callback) {
            if(showsteps) { console.log('Then the image is labeled with page '+ arg1); }
            vp.resetFrame(
                function() {
                    vp.selectedThumbnailLabels().then(
                        function (labels) {
                            var label;
                            var actual;
                            for(i = 0; i < labels.length; i++){
                                label = labels[i];
                                label.getText().then(
                                    function (labelText) {
                                        labelText = labelText.trim();
                                        if(labelText.substring(0,2) == arg1) {
                                            callback();
                                        } else {
                                            actual =+ labelText;
                                            if(i == labels.length - 1) {
                                                callback.fail("page label (" + actual + ") should be (" + arg1 + ")");
                                            }
                                        }
                                    },
                                    function () {
                                        callback.fail('could not get text of thumbnail label');
                                    });
                            }
                        },
                        function () {
                            callback.fail('could not find thumbnail labels');
                        });
                });
        });
    }
    /* END OF NAVIGATION */

    /* RIGHTS NOTICES */
    {
        this.When(/^they click the More button in the initial rights notice$/, function(callback) {
            if (showsteps) { console.log('When they click the More button in the initial rights notice'); }
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeAttributionMoreButton().then(
                        function(centerPanelRightsNoticeAttributionMoreButton) {
                            centerPanelRightsNoticeAttributionMoreButton.click().then(
                                callback,
                                function() {
                                    callback.fail('could not click centerPanelRightsNoticeAttributionMoreButton');
                                });
                        },
                        function() {
                            callback.fail('could not find centerPanelRightsNoticeAttributionMoreButton');
                        });
                });
        });

        this.Given(/^they have clicked on the More button in the initial rights notice$/, function(callback) {
            if (showsteps) { console.log('Given they have clicked on the More button in the initial rights notice'); }
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeAttributionMoreButton().then(
                        function(centerPanelRightsNoticeAttributionMoreButton) {
                            if (showdebug) { console.log('found more toggle button'); }
                            centerPanelRightsNoticeAttributionMoreButton.click().then(
                                callback,
                                function() {
                                    callback.fail('could not click centerPanelRightsNoticeAttributionMoreButton');
                                });
                        },
                        function() {
                            if (showdebug) { console.log('could not find more toggle button'); }
                            vp.centerPanelRightsNoticeAttributionLessButton().then(
                                function(centerPanelRightsNoticeAttributionLessButton) {
                                    if(showdebug) { console.log('found less button so must be in more mode already'); }
                                    callback();
                                },
                                function() {
                                    callback.fail('could not find more or less toggle button');
                                });
                        });
                });
        });

        this.When(/^they click the Less button in the initial rights notice$/, function(callback) {
            if (showsteps) { console.log('When they click the Less button in the initial rights notice'); }
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeAttributionLessButton().then(
                        function(centerPanelRightsNoticeAttributionLessButton) {
                            centerPanelRightsNoticeAttributionLessButton.click().then(
                                callback,
                                function() {
                                    callback.fail('could not click centerPanelRightsNoticeAttributionLessButton');
                                });
                        },
                        function() {
                            callback.fail('could not find centerPanelRightsNoticeAttributionLessButton');
                        });
                });
        });

        this.Given(/^the full text of the initial rights notice is displayed and recorded$/, function(callback) {
            if (showsteps) { console.log('Given the full text of the initial rights notice is displayed and recorded'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeAttribution().then(
                        function(centerPanelRightsNoticeAttribution) {
                            centerPanelRightsNoticeAttribution.getText().then(
                                function(centerPanelRightsNoticeAttributionText) {
                                    that.originalAttributionTextLength = centerPanelRightsNoticeAttributionText.length;
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    callback();
                                },
                                function() {
                                    callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find centerPanelRightsNoticeAttribution');
                        });
                });
        });

        this.Then(/^the full text of the initial rights notice is displayed$/, function(callback) {
            if (showsteps) { console.log('Then the full text of the initial rights notice is displayed'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeAttribution().then(
                        function(centerPanelRightsNoticeAttribution) {
                            centerPanelRightsNoticeAttribution.getText().then(
                                function(centerPanelRightsNoticeAttributionText) {
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    if(showdebug) { console.log('current attribution text length = ' + centerPanelRightsNoticeAttributionText.length); }
                                    if(centerPanelRightsNoticeAttributionText.length > that.originalAttributionTextLength) {
                                        callback();
                                    } else {
                                        callback.fail('text in attribution panel was not longer');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find centerPanelRightsNoticeAttribution');
                        });
                });
        });

        this.Given(/^the partial text of the initial rights notice is displayed and recorded$/, function(callback) {
            if (showsteps) { console.log('Given the partial text of the initial rights notice is displayed and recorded'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeAttribution().then(
                        function(centerPanelRightsNoticeAttribution) {
                            centerPanelRightsNoticeAttribution.getText().then(
                                function(centerPanelRightsNoticeAttributionText) {
                                    // record the current length of the attribution text for later
                                    that.originalAttributionTextLength = centerPanelRightsNoticeAttributionText.length;
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    vp.resetFrame(
                                        function() {
                                            vp.centerPanelRightsNoticeAttributionMoreToggle().then(
                                                function(centerPanelRightsNoticeAttributionMoreToggle) {
                                                    callback();
                                                },
                                                function() {
                                                    callback.fail('could not find centerPanelRightsNoticeAttributionMoreToggle');
                                                });
                                        });
                                },
                                function() {
                                    callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find centerPanelRightsNoticeAttribution');
                        });
                });
        });

        this.Then(/^the partial text of the initial rights notice is displayed$/, function(callback) {
            if (showsteps) { console.log('Then the partial text of the initial rights notice is displayed'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeAttribution().then(
                        function(centerPanelRightsNoticeAttribution) {
                            centerPanelRightsNoticeAttribution.getText().then(
                                function(centerPanelRightsNoticeAttributionText) {
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    if(showdebug) { console.log('current attribution text length = ' + centerPanelRightsNoticeAttributionText.length); }
                                    if(centerPanelRightsNoticeAttributionText.length < that.originalAttributionTextLength) {
                                        callback();
                                    } else {
                                        callback.fail('text in attribution panel was not shorter');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find centerPanelRightsNoticeAttribution');
                        });
                });
        });

        this.Then(/^a rights notice is shown on the main display$/, function (callback) {
            if (showsteps) { console.log('Then a rights notice is shown on the main display'); }
            vp.resetFrame(
                function() {
                    vp.centerPanelRightsNoticeTitle().then(
                        function(centerPanelRightsNoticeTitle) {
                            centerPanelRightsNoticeTitle.getText().then(
                                function(centerPanelRightsNoticeTitleText) {
                                    if(centerPanelRightsNoticeTitleText.length > 0) {
                                        callback();
                                    } else {
                                        callback.fail('centerPanelRightsNoticeTitle text was empty');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of centerPanelRightsNoticeTitle');
                                });
                        },
                        function() {
                            callback.fail('could not find centerPanelRightsNoticeTitle');
                        });
                });
        });

        this.Then(/^a rights notice is shown within the MORE INFORMATION panel$/, function (callback) {
            if (showsteps) { console.log('Then a rights notice is shown within the MORE INFORMATION panel'); }
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeTitle().then(
                        function(moreInformationPanelRightsNoticeTitle) {
                            moreInformationPanelRightsNoticeTitle.getText().then(
                                function(moreInformationPanelRightsNoticeTitleText) {
                                    if(moreInformationPanelRightsNoticeTitleText.length > 0) {
                                        callback();
                                    } else {
                                        callback.fail('moreInformationPanelRightsNoticeTitle text was empty');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of moreInformationPanelRightsNoticeTitle');
                                });
                        },
                        function() {
                            callback.fail('could not find moreInformationPanelRightsNoticeTitle');
                        });
                });
        });

        this.When(/^the partial text of the MORE INFORMATION panel rights notice is displayed and recorded$/, function(callback) {
            if(showsteps) { console.log('When the partial text of the MORE INFORMATION panel rights notice is displayed and recorded'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeAttribution().then(
                        function(moreInformationPanelRightsNoticeAttribution) {
                            moreInformationPanelRightsNoticeAttribution.getText().then(
                                function(moreInformationPanelRightsNoticeAttributionText) {
                                    // record the current length of the attribution text for later
                                    that.originalAttributionTextLength = moreInformationPanelRightsNoticeAttributionText.length;
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    vp.resetFrame(
                                        function() {
                                            vp.moreInformationPanelRightsNoticeToggle().then(
                                                function(moreInformationPanelRightsNoticeToggle) {
                                                    callback();
                                                },
                                                function() {
                                                    callback.fail('could not find moreInformationPanelRightsNoticeToggle');
                                                });
                                        });
                                },
                                function() {
                                    callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                        });
                });
        });

        this.When(/^they click the More button in the MORE INFORMATION panel rights notice$/, function(callback) {
            if (showsteps) { console.log('When they click the More button in the MORE INFORMATION panel rights notice'); }
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeAttributionMoreButton().then(
                        function(moreInformationPanelRightsNoticeAttributionMoreButton) {
                            moreInformationPanelRightsNoticeAttributionMoreButton.click().then(
                                callback,
                                function() {
                                    callback.fail('could not click moreInformationPanelRightsNoticeAttributionMoreButton');
                                });
                        },
                        function() {
                            callback.fail('could not find moreInformationPanelRightsNoticeAttributionMoreButton');
                        });
                });
        });

        this.Then(/^the full text of the MORE INFORMATION panel rights notice is displayed$/, function(callback) {
            if (showsteps) { console.log('Then the full text of the MORE INFORMATION panel rights notice is displayed'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeAttribution().then(
                        function(moreInformationPanelRightsNoticeAttribution) {
                            moreInformationPanelRightsNoticeAttribution.getText().then(
                                function(moreInformationPanelRightsNoticeAttributionText) {
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    if(showdebug) { console.log('current attribution text length = ' + moreInformationPanelRightsNoticeAttributionText.length); }
                                    if(moreInformationPanelRightsNoticeAttributionText.length > that.originalAttributionTextLength) {
                                        callback();
                                    } else {
                                        callback.fail('text in attribution panel was not longer');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                        });
                });
        });

        this.Given(/^they have clicked MORE INFORMATION$/, function(callback) {
            if (showsteps) { console.log('Given they have clicked MORE INFORMATION'); }
            vp.clickMoreInformation(callback, callback);
        });

        this.Given(/^they have clicked the More button in the MORE INFORMATION panel rights notice$/, function(callback) {
            if (showsteps) { console.log('Given they have clicked the More button in the MORE INFORMATION panel rights notice'); }
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeAttributionMoreButton().then(
                        function(moreInformationPanelRightsNoticeAttributionMoreButton) {
                            if (showdebug) { console.log('found more toggle button'); }
                            moreInformationPanelRightsNoticeAttributionMoreButton.click().then(
                                callback,
                                function() {
                                    callback.fail('could not click moreInformationPanelRightsNoticeAttributionMoreButton');
                                });
                        },
                        function() {
                            if (showdebug) { console.log('could not find more toggle button'); }
                            vp.moreInformationPanelRightsNoticeAttributionLessButton().then(
                                function(moreInformationPanelRightsNoticeAttributionLessButton) {
                                    if(showdebug) { console.log('found less button so must be in more mode already'); }
                                    callback();
                                },
                                function() {
                                    callback.fail('could not find more or less toggle button');
                                });
                        });
                });
        });

        this.Given(/^the full text of the MORE INFORMATION panel rights notice is displayed and recorded$/, function(callback) {
            if (showsteps) { console.log('Given the full text of the MORE INFORMATION panel rights notice is displayed and recorded'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeAttribution().then(
                        function(moreInformationPanelRightsNoticeAttribution) {
                            moreInformationPanelRightsNoticeAttribution.getText().then(
                                function(moreInformationPanelRightsNoticeAttributionText) {
                                    that.originalAttributionTextLength = moreInformationPanelRightsNoticeAttributionText.length;
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    callback();
                                },
                                function() {
                                    callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                        });
                });
        });

        this.When(/^they click the Less button in the MORE INFORMATION panel rights notice$/, function(callback) {
            if (showsteps) { console.log('When they click the Less button in the MORE INFORMATION panel rights notice'); }
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeAttributionLessButton().then(
                        function(moreInformationPanelRightsNoticeAttributionLessButton) {
                            moreInformationPanelRightsNoticeAttributionLessButton.click().then(
                                callback,
                                function() {
                                    callback.fail('could not click moreInformationPanelRightsNoticeAttributionLessButton');
                                });
                        },
                        function() {
                            callback.fail('could not find moreInformationPanelRightsNoticeAttributionLessButton');
                        });
                });
        });

        this.Then(/^the partial text of the MORE INFORMATION panel rights notice is displayed$/, function(callback) {
            if (showsteps) { console.log('Then the partial text of the MORE INFORMATION panel rights notice is displayed'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.moreInformationPanelRightsNoticeAttribution().then(
                        function(moreInformationPanelRightsNoticeAttribution) {
                            moreInformationPanelRightsNoticeAttribution.getText().then(
                                function(moreInformationPanelRightsNoticeAttributionText) {
                                    if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                    if(showdebug) { console.log('current attribution text length = ' + moreInformationPanelRightsNoticeAttributionText.length); }
                                    if(moreInformationPanelRightsNoticeAttributionText.length < that.originalAttributionTextLength) {
                                        callback();
                                    } else {
                                        callback.fail('text in attribution panel was not shorter');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                                });
                        },
                        function() {
                            callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                        });
                });
        });
    }
    /* END OF RIGHTS NOTICES */

    /* THUMBNAILS */
    {
        this.When(/^they click in the Thumbnails tab$/, function (callback) {
            if(showsteps) { console.log("When they click in the Thumbnails tab"); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.contentsPanelExpandThumbnailsButton().then(
                        function(contentsPanelExpandThumbnailsButton) {
                            contentsPanelExpandThumbnailsButton.click().then(
                                callback,
                                function () {
                                    callback.fail('clicking on thumbnails expand button did not work')
                                });
                        }, function() {
                            callback.fail('expand thumbnails button not found');
                        });
                });
        });

        this.When(/^they click in the expand arrow in the Thumbnails tab$/, function (callback) {
            if(showsteps) { console.log('When they click in the expand arrow in the Thumbnails tab'); }
            var that = this;
            vp.contentsPanelExpandThumbnailsButton().then(
                function(contentsPanelExpandThumbnailsButton) {
                    vp.getThumbnailPanelWidth(
                        function (width) {
                            that.thumbnailPanelWidth = width;
                            contentsPanelExpandThumbnailsButton.click().then(
                                callback,
                                function () {
                                    callback.fail('clicking on thumbnails expand button did not work')
                                });
                        },
                        callback);
                }, function() {
                    callback.fail('expand thumbnails button not found');
                });
        });

        this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
            if(showsteps) { console.log("Then a list of thumbnails is rendered to the user"); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelLoadedImages().then(
                        function(thumbnailImages) {
                            if(thumbnailImages.length < 3) {
                                callback.fail('not enough thumbnails for test');
                            } else {
                                thumbnailImages[0].getAttribute('src').then(
                                    function(src) {
                                        if(src.substring(src.length - 4, src.length) == '.jpg') {
                                            callback();
                                        } else {
                                            callback.fail("image is not a jpg");
                                        }
                                    },
                                    function() {
                                        callback.fail("img src not found");
                                    });
                            }
                        });
                });
        });

        this.Then(/^the list of thumbnails is expanded$/, function (callback) {
            if(showsteps) { console.log('Then the list of thumbnails is expanded'); }
            var that = this;
            vp.sleep(vp.reactionDelay).then(
                function() {
                    vp.getThumbnailPanelWidth(
                        function (width) {
                            if (width > that.thumbnailPanelWidth) {
                                that.thumbnailPanelWidth = width;
                                callback();
                            } else {
                                callback.fail('thumbnails panel should be expanded');
                            }
                        },
                        callback);
                });
        });

        this.Given(/^the user is viewing the expanded thumbnails list$/, function (callback) {
            if(showsteps) { console.log('Given the user is viewing the expanded thumbnails list'); }
            vp.resetFrame(
                function() {
                    vp.contentsPanelExpandThumbnailsButton().then(
                        function(expandThumbnailsButton) {
                            expandThumbnailsButton.isDisplayed().then(
                                function(expandThumbnailsButtonIsDisplayed) {
                                    if(expandThumbnailsButtonIsDisplayed) {
                                        if(showdebug) { console.log('expand is displayed'); }
                                        if(showdebug) { console.log('clicking expand'); }
                                        expandThumbnailsButton.click().then(
                                            callback,
                                            function() {
                                                callback.fail('clicking expand thumbnails list failed');
                                            });
                                    } else {
                                        if(showdebug) { console.log('expand is not displayed'); }
                                        // might already be in expanded view
                                        vp.resetFrame(
                                            function() {
                                                vp.contentsPanelCollapseThumbnailsButton().then(
                                                    function(collapseThumbnailsButton) {
                                                        collapseThumbnailsButton.isDisplayed().then(
                                                            function(collapseThumbnailsButtonIsDisplayed) {
                                                                if(collapseThumbnailsButtonIsDisplayed) {
                                                                    if(showdebug) { console.log('collapse is displayed'); }
                                                                    callback();
                                                                } else {
                                                                    if(showdebug) { console.log('collapse is not displayed'); }
                                                                    callback.fail('neither expand nor collapse is displayed');
                                                                }
                                                            },
                                                            function() {
                                                                callback.fail('expand not displayed and collapse not found');
                                                            });
                                                    });
                                            });
                                    }
                                });
                        });
                });
        });

        this.When(/^they click on the collapse thumbails arrow$/, function (callback) {
            if(showsteps) { console.log('When they click on the collapse thumbails arrow'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.contentsPanelCollapseThumbnailsButton().then(
                        function(contentsPanelCollapseThumbnailsButton) {
                            vp.getThumbnailPanelWidth(
                                function (width) {
                                    that.thumbnailPanelWidth = width;
                                    contentsPanelCollapseThumbnailsButton.click().then(
                                        callback,
                                        function () {
                                            callback.fail('clicking on thumbnails collapse button did not work')
                                        });
                                },
                                callback);
                        }, function() {
                            callback.fail('collapse thumbnails button not found');
                        });
                });
        });

        this.Then(/^the list of thumbnails is contracted$/, function (callback) {
            if(showsteps) { console.log('Then the list of thumbnails is contracted'); }
            var that = this;
            vp.sleep(vp.reactionDelay).then(
                function() {
                    vp.getThumbnailPanelWidth(
                        function (width) {
                            if (width < that.thumbnailPanelWidth) {
                                that.thumbnailPanelWidth = width;
                                callback();
                            } else {
                                callback.fail('thumbnails panel should be collapsed');
                            }
                        },
                        callback);
                });
        });

        this.When(/^they click on a thumbnail$/, function (callback) {
            if (showsteps) { console.log('When they click on a thumbnail'); }
            var that = this;
            vp.resetFrame(
                function () {
                    vp.contentsPanelExpandedThumbnails().then(
                        function (thumbnails) {
                            thumbnails[0].isDisplayed().then(
                                function (elementIsDisplayed) {
                                    if (elementIsDisplayed) {
                                        if(that.showdebug) { console.log('first thumbnail is displayed'); }
                                        if(that.showdebug) { console.log('clicking first thumbnail'); }
                                        vp.getThumbnailPanelWidth(
                                            function (width) {
                                                that.thumbnailPanelWidth = width;
                                                thumbnails[0].click().then(
                                                    callback,
                                                    function() {
                                                        callback.fail('clicking first thumbnail failed');
                                                    });
                                            },
                                            callback);
                                    } else {
                                        callback.fail('first thumbnail is not visible');
                                    }
                                });
                        },
                        function () {
                            callback.fail('thumbnails not found')
                        });
                });
        });

        this.When(/^they click the Increase thumbnails size button$/, function (callback) {
            if(showsteps) { console.log('When they click the Increase thumbnails size button'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.contentsPanelThumbnailIncreaseSizeButton().then(
                        function(thumbnailIncreaseSizeButton) {
                            vp.getThumbnailWidthInExpandedView(
                                function(width) {
                                    that.thumbnailWidth = width;
                                    thumbnailIncreaseSizeButton.click().then(
                                        callback,
                                        function() {
                                            callback.fail('clicking thumbnail increase size button failed');
                                        });
                                },
                                callback);
                        },
                        function() {
                            callback.fail('thumbnail increase size button not found');
                        });
                });
        });

        this.Then(/^the size of the Thumbnail is increased$/, function (callback) {
            if(showsteps) { console.log('Then the size of the Thumbnail is increased'); }
            var that = this;
            vp.sleep(vp.reactionDelay).then(
                function() {
                    vp.getThumbnailWidthInExpandedView(
                        function (width) {
                            if (width > that.thumbnailWidth) {
                                that.thumbnailWidth = width;
                                callback();
                            } else {
                                callback.fail('Size of Thumbnail should be bigger than before.');
                            }
                        },
                        callback);
                });
        });

        this.When(/^they click the Decrease thumbnails size button$/, function (callback) {
            if(showsteps) { console.log('When they click the Decrease thumbnails size button'); }
            var that = this;
            vp.resetFrame(
                function() {
                    vp.contentsPanelThumbnailDecreaseSizeButton().then(
                        function(thumbnailDecreaseSizeButton) {
                            vp.getThumbnailWidthInExpandedView(
                                function(width) {
                                    that.thumbnailWidth = width;
                                    thumbnailDecreaseSizeButton.click().then(
                                        callback,
                                        function() {
                                            callback.fail('clicking thumbnail decrease size button failed');
                                        });
                                },
                                callback);
                        },
                        function() {
                            callback.fail('thumbnail decrease size button not found');
                        });
                });
        });

        this.Then(/^the size of the Thumbnail is decreased$/, function (callback) {
            if(showsteps) { console.log('Then the size of the Thumbnail is decreased'); }
            var that = this;
            vp.sleep(vp.reactionDelay).then(
                function() {
                    vp.getThumbnailWidthInExpandedView(
                        function (width) {
                            if (width < that.thumbnailWidth) {
                                that.thumbnailWidth = width;
                                callback();
                            } else {
                                callback.fail('Size of Thumbnail should be smaller than before.');
                            }
                        },
                        callback);
                });
        });
    }
    /* END OF THUMBNAILS */

    /* ZOOM */
    {
        this.When(/^they click zoom in button$/, function (callback) {
            if(showsteps) { console.log('When they click zoom in button'); }
            vp.zoomIntoImage(callback, callback);
        });

        this.Then(/^an area of the image has a bigger display$/, function (callback) {
            if(showsteps) { console.log('Then an area of the image has a bigger display'); }
            callback.pending();
        });

        this.When(/^they click zoom out button$/, function (callback) {
            if(showsteps) { console.log('When they click zoom out button'); }
            vp.zoomOutImage(callback, callback);
        });

        this.Then(/^an area of the image is seen more far away$/, function (callback) {
            if(showsteps) { console.log('Then an area of the image is seen more far away'); }
            callback.pending();
        });

        this.Given(/^the image is zoomed$/, function (callback) {
            if(showsteps) { console.log('Given the image is zoomed'); }
            vp.zoomIntoImage(callback, callback);
        });

        //this.When(/^the user press the mouse and drag the image to the right$/, function (callback) {
        //    if(showsteps) { console.log('When the user press the mouse and drag the image to the right'); }
        //    callback.pending();
        //});
        //
        //this.Then(/^that part of the image moves to the right$/, function (callback) {
        //    if(showsteps) { console.log('Then that part of the image moves to the right'); }
        //    callback.pending();
        //});

        this.When(/^the current zoom level is recorded$/, function(callback) {
            if (showsteps) { console.log('When the current zoom level is recorded'); }
            var that = this;
            vp.getZoomLevel(
                callback,
                function (zoomLevel) {
                    that.currentZoomLevel = zoomLevel;
                    callback();
                });
        });

        this.Then(/^the current zoom level matches that which was recorded$/, function (callback) {
            if(showsteps) { console.log('Then the current zoom level matches that which was recorded'); }
            var that = this;
            vp.getZoomLevel(
                callback,
                function(zoomLevel) {
                    if(zoomLevel == that.currentZoomLevel) {
                        callback();
                    } else {
                        callback.fail('current zoom level (' + currentUrl + ') did not match recorded value (' + that.currentZoomLevel + ')');
                    }
                });
        });
    }
    /* END OF ZOOM */
};

module.exports = myStepDefinitionsWrapper;