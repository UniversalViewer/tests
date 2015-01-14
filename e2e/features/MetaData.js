var ViewerPage = require("./PageObjects/ViewerPage.js");
var Metadata = function() {
	var showdebug = false;
	var showsteps = false;

	this.Given(/^the user is viewing the Viewer$/, function (callback) {
		if(showsteps) { console.log('Given the user is viewing the Viewer - Metadata.js'); }
		new ViewerPage()
			.startCanvas()
			.then(
				function(el){
					if(showdebug) { console.log('got canvas elements'); }
					callback();
				},
				function(){
					callback.fail('no seadragon canvas elements');
				});
	});

	this.When(/^they click MORE INFORMATION$/, function (callback) {
		if(showsteps) { console.log('When they click MORE INFORMATION - Metadata.js'); }
		new ViewerPage()
			.moreInformation()
			.then(function(el) {
				el.click().then(function(){
					callback();
				});
			});
	});

	this.Then(/^metadata key\/value pairs are displayed to the user$/, function (callback) {
		if(showsteps) { console.log('Then metadata key\/value pairs are displayed to the user - Metadata.js'); }
		new ViewerPage()
			.sleep(3000)
			.then(function() {
			new ViewerPage()
				.moreInformationHeaders()
				.then(function (els) {
				if (els.length > 0) {
					new ViewerPage()
						.moreInformationTexts()
						.then(function (els) {
							if (els.length > 0) {
								callback();
							}
							else
								callback.fail("text array is empty");
						});
				}
				else {
					callback.fail('header array is empty');
				}
			}, function () {
				callback.fail("header div not found");
			});
		});
	});

	this.Then(/^the metadata side panel is visible to the user$/, function (callback) {
		if(showsteps) { console.log('Then the metadata side panel is visible to the user  - Metadata.js'); }
		new ViewerPage()
			.rightPanel()
			.then(function(el) {
				callback();
			},function(){
				callback.fail("metadata side panel not found");
			});
	});

};

module.exports = Metadata;