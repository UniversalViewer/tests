var ViewerPage = require("./PageObjects/ViewerPage.js");
var Metadata = function() {
	var ptor = browser;
	var showdebug = false;
	var showsteps = false;

	this.Given(/^the user is viewing the Viewer$/, function (callback) {
		if(showsteps) { console.log('Given the user is viewing the Viewer'); }
		new ViewerPage().startCanvas().then(
			function(startCanvas) {
				if(showdebug) { console.log('got canvas elements'); }
				callback();
			},
			function() {
				callback.fail('no seadragon canvas elements');
			});
	});

	this.When(/^they click MORE INFORMATION$/, function (callback) {
		if(showsteps) { console.log('When they click MORE INFORMATION'); }
		new ViewerPage().resetFrame(
			function() {
				new ViewerPage().moreInformationButton().then(
					function(moreInformationButton) {
						moreInformationButton.click().then(
							callback,
							function() {
								callback.fail('clicking more information button failed');
							});
					});
			});
	});

	this.Then(/^metadata key\/value pairs are displayed to the user$/, function (callback) {
		if(showsteps) { console.log('Then metadata key\/value pairs are displayed to the user'); }
		new ViewerPage().resetFrame(
			function() {
				new ViewerPage().sleep(3000).then(
					function() {
						new ViewerPage().moreInformationHeaders().then(
							function (moreInformationHeaders) {
								if (moreInformationHeaders.length > 0) {
									new ViewerPage().resetFrame(
										function() {
											new ViewerPage().moreInformationTexts().then(
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
		new ViewerPage().resetFrame(
			function() {
				new ViewerPage().infoPanel().then(
					function(infoPanel) {
						infoPanel().isDisplayed().then(
							callback,
							function() {
								callback.fail('metadata side panel not displayed');
							});
						callback();
					},
					function() {
						callback.fail('metadata side panel not found');
					});
			});
	});
};

module.exports = Metadata;