var LanguageLookup = function() {
    var that = this;

    this.languageNames = {};
    this.languageSpecialChars = {};

    this.addLanguage = function(code, name, specialChars) {
        that.languageNames[name] = code;
        that.languageSpecialChars[code] = specialChars;
    };

    this.getLanguageCode = function(languageName) {
        if(languageName in that.languageNames) {
            return that.languageNames[languageName];
        }
        return 'none';
    };

    this.getSpecialChars = function(languageCode) {
        if(languageCode in that.languageSpecialChars) {
            return that.languageSpecialChars[languageCode];
        }
        return '';
    };

    this.containsSpecialChars = function(text, languageCode) {
        if(languageCode in that.languageSpecialChars) {
            var specialChars = this.languageSpecialChars[languageCode];
            for(var y = 0; y < text.length; y++) {
                for(var x = 0; x < specialChars.length; x++) {
                    if(text[y] == specialChars[x]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    this.addLanguage('en-GB', 'English', '');
    this.addLanguage('cy-GB', 'Welsh', 'ûüúùŵẅẃẁŷÿýỳâäáàêëéèîïíìôöóò');
    this.addLanguage('xx-XX', 'TestLanguage', '');
};

module.exports = LanguageLookup;