
var World = function (callback) {
    this.getAppContainer = function() {
        return $('.wellcomePlayer iframe').contents().find('#app');
    };

    // last line to tell cucumber.js the World is ready.
    callback(this);
};

//exports.World = World;


//var World = module.exports = function(){
//
//    this.getAppContainer = function() {
//        return $('.wellcomePlayer iframe').contents().find('#app');
//    };
//
////    this.page = function(path){
////        return "http://localhost:8001" + path;
////    };
////
////    this.visit = function(path, callback){
////        this.browser.visit( this.page(path), function(err, browser, status){
////            callback(err, browser, status);
////        });
////    };
//};