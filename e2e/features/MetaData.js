
var Metadata = function() {
	var ptor;

	this.Before(function (callback) {
		browser.ignoreSynchronization = true;
		ptor = protractor.getInstance();
		callback();
		//	.then(function(){
		//	ptor.sleep(5000).then(function () {
		//		this.switchToViewerFrame();
		//		ptor.sleep(3000).then(function () {
		//			callback();
		//		});
		//	});
		//});

	});

	this.After(function(done){
		browser.ignoreSynchronization = true;
		ptor.switchTo().defaultContent();
		done();
	});



	this.Given(/^the user is viewing the Viewer$/, function (callback) {
		console.log('Given the user is viewing the Viewer - Metadata.js');
		//this.switchToViewerFrame();
		//ptor.findElement(protractor.By.id('app'))
		//	.then(function(){
		//	callback();
		//},
		//function(){
		//	callback.fail('no seadragon frame');
		//});

		// http://assertselenium.com/2013/02/22/handling-iframes-using-webdriver/
		//ptor.close();
		//ptor.get('/examples/monograph.html').then(function(){
			//console.log('Get monograph');
			//ptor.getTitle().then(function(val){
			//	console.log(val);
			//});

			ptor.sleep(3000).then(function(){
				ptor.findElement(protractor.By.tagName('iframe'))
					.then(
					function(iframe) {
						console.log('the iframe: ' + iframe);
						callback();
					},
					function() {
					callback.fail("iframe not found");
					});
			});

		//});
	});

	this.When(/^they click MORE INFORMATION$/, function (callback) {
		console.log('When they click MORE INFORMATION - Metadata.js');
		this.switchToViewerFrame();
		console.log('the link: ');
		ptor.findElement(protractor.By.css('.rightPanel .expandButton')).then(
			function(el) {
				console.log('el: ');
				el.click().then(
					function () {
						//ptor.switchTo().defaultContent();
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
		this.switchToViewerFrame();

		ptor.findElement(protractor.By.css('.rightPanel .main .items')).then(function(el) {
			console.log('the metadata div: ' + el);
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
		this.switchToViewerFrame();
		ptor.findElement(protractor.By.css('.rightPanel')).then(
			function(el) {
				console.log('the rightPanel div: ' + el);
				//if(el.elements.length > 0){
					//ptor.switchTo().defaultContent();
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