module.exports = function() {

  this.World = function World(callback) {
    this.prop = "Hello from the World!"; // this property will be available in step definitions

    this.greetings = function(name, callback) {
      console.log("\n----Hello " + name);
      callback();
    };

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
  };

  this.findElementInFrame = function(driver, byFun) {
    driver.findElements(protractor.By.css('iFrame')).then(function(iFrames)
    {
      for (i = 0; i < iFrames.length; i++){
        driver.switch().frame(driver.findElements(protractor.By.css('iFrame').get(i))).then(
          driver.findElement(byFun).then(function(elem){
            return elem;
          }),
            (function(){
              return null;
            })
        )
      }
    });
  }
}