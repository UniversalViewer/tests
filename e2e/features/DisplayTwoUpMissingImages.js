var DisplayTwoUpMissingImages = function() {

    var ptor = protractor.browser;

    this.Then(/^an "([^"]*)" pop up is displayed to the user$/, function (arg1, callback) {
        console.log('Then an ' + arg1 + ' pop up is displayed to the user');
        ptor.findElement(protractor.By.css('.overlay.genericDialogue .middle .content'))
            .then(function(popupContent) {
                popupContent.getText()
                    .then(function(popupText){
                        if(popupText.indexOf(arg1) > -1){
                            callback();
                        } else {
                            callback.fail('Text ' + arg1 + ' not found in pop up.');
                        }
                    });
            },
            function(){
                callback.fail('Pop up not found.');
            });
    });

};

module.exports = DisplayTwoUpMissingImages;
