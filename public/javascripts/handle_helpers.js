(function() {
    var register = function(Handlebars) {

        /************* BEGIN HELPERS *************/
        var helpers = {
            userDetails: function(content, detail){
                if (detail = 'organization')
                    return content.organization;
                if (detail = 'fullname')
                    return content.firstname + ' ' + content.lastname;
            }
        };
        /************* END HELPERS *************/

        if (Handlebars && typeof Handlebars.registerHelper === "function") {
            // register helpers
            for (var prop in helpers) {
                Handlebars.registerHelper(prop, helpers[prop]);
            }
        } else {
            // just return helpers object if we can't register helpers here
            return helpers;
        }
    };

    // client
    if (typeof window !== "undefined") {
        register(Handlebars);
    }
    // server
    else {
        module.exports.register = register;
        module.exports.helpers = register(null);
    }
})();