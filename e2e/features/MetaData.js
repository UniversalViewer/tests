
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
		//this.switchToViewerFrame();

		ptor.findElements(protractor.By.css('.rightPanel .main .items .item')).then(function(els) {
			console.log('the metadata div ' + els);
			//ptor.switchTo().defaultContent();
			callback();
			//TODO: Find header and text pair when available
			//el.getAttribute("class").then(function(c) {
			//	console.log("the class: " + c);
			//	callback();
			//});

		}, function(){
			callback.fail("metadata div not found");
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