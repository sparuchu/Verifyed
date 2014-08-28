/**
 * Created by Srinivas Paruchuri on 8/28/2014.
 */

var signupConfirmData = {
        organization: "BMS",
        fullname: "Srinivas Paruchuri",
        email: "sriniv@yahoo.com",
        designation: "CTO",
        phone: "+91-9866277000"
};

// Grab the HTML source that needs to be compiled
var signupConfirm = $("#signup-confirm-template").html();
// Compiles the source
var signupConfirmTemplate = Handlebars.compile( signupConfirm );

$("#signup-confirm-placeholder").html(signupConfirmTemplate( signupConfirmData ));

