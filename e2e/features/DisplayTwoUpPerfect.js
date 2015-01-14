var DisplayTwoUpPerfect = function() {

    var ptor = protractor.browser;

    this.Then(/^two pages are displayed to the user$/, function (done) {
        console.log('Then two pages are displayed to the user');
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