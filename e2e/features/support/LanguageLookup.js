var LanguageLookup = function() {
    var that = this;

    var languageNames = {};

    languageNames['English'] = 'en-GB';
    languageNames['Welsh'] = 'cy-GB';
    languageNames['TestLanguage'] = 'xx-XX';

    this.languageNames = languageNames;

    var languageSpecialChars = {};

    languageSpecialChars['en-GB'] = '';
    languageSpecialChars['cy-GB'] = 'ûüúùŵẅẃẁŷÿýỳâäáàêëéèîïíìôöóò';

    this.languageSpecialChars = languageSpecialChars;

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
    }
};

module.exports = LanguageLookup;