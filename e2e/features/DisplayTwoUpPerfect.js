var DisplayTwoUpPerfect = function() {

    var ptor;

    this.Before(function (callback) {
        console.log('Display.js Before');
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        callback();
    });

    this.Then(/^two pages are displayed to the user$/, function (done) {
        ptor.findElements(protractor.By.css('.thumb.selected'))
            .then(function(selectedThumbs){
                if(selectedThumbs.length == 2)
                    done();
                else
                    done.fail('2 thumbnails should be selected');
            },
            function(){
                done.fail('No thumb selected');
            });
    });

};

module.exports = DisplayTwoUpPerfect;