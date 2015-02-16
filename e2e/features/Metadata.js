var ViewerPage = require("./PageObjects/ViewerPage.js");

var Metadata = function() {

	var ptor = browser;
	var showdebug = new ViewerPage().showdebug;
	var showsteps = new ViewerPage().showsteps;
    var vp = new ViewerPage();

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

    this.Given(/^the MORE INFORMATION panel is visible$/, function(callback) {
        if(showsteps) { console.log('Given the MORE INFORMATION panel is visible'); }
        vp.clickMoreInformation(callback);
    });

	this.When(/^they click MORE INFORMATION$/, function (callback) {
		if(showsteps) { console.log('When they click MORE INFORMATION'); }
        vp.clickMoreInformation(callback);
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
                vp.infoPanel().then(
					function(infoPanel) {
						infoPanel.isDisplayed().then(
							function(isDisplayed) {
								if(isDisplayed) {
									callback();
								} else {
									callback.fail('metadata side panel not displayed');
								}
							});
					},
					function() {
						callback.fail('metadata side panel not found');
					});
			});
	});
};

module.exports = Metadata;