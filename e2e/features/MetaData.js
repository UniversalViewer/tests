
var Metadata = function() {
	var ptor;

	this.Before(function (callback) {
		console.log('Metadata.js Before');
		browser.ignoreSynchronization = true;
		ptor = protractor.getInstance();
		callback();
	});

	this.Given(/^the user is viewing the Viewer$/, function (callback) {
		console.log('Given the user is viewing the Viewer - Metadata.js');
		ptor.findElements(protractor.By.css('.openseadragon-canvas canvas'))
			.then(function(){
				callback();
			},
			function(){
				callback.fail('no seadragon canvas wrapper');
			});
	});

	this.When(/^they click MORE INFORMATION$/, function (callback) {
		console.log('When they click MORE INFORMATION - Metadata.js');
		//this.switchToViewerFrame();
		console.log('the link: ');
		ptor.findElement(protractor.By.css('.rightPanel .expandButton')).then(
			function(el) {
				console.log('el: ');
				el.click().then(
					function () {
						callback();
					}
				)
			},function(){
				callback.fail("link not found");
			}
		);
	});

	this.Then(/^metadata key\/value pairs are displayed to the user$/, function (callback) {
		console.log('Then metadata key\/value pairs are displayed to the user - Metadata.js');
		ptor.sleep(3000).then(function() {
			ptor.findElements(protractor.By.css('.rightPanel .main .items .item .header')).then(function (els) {
				if (els.length > 0) {
					ptor.findElements(protractor.By.css('.rightPanel .main .items .item .text'))
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
		console.log('Then the metadata side panel is visible to the user  - Metadata.js');
		ptor.findElement(protractor.By.css('.rightPanel')).then(
			function(el) {
				console.log('the rightPanel div: ' + el);
				//if(el.elements.length > 0){

					callback();
				//}else{
				//	callback.fail("metadata side panel is empty");
				//}

			}, function(){
				callback.fail("metadata side panel not found");
			}
		);
	});

};

module.exports = Metadata;