// server/router/index.js
// Need to organize routes into individual route path files

module.exports = function (app) {
    app.get('/',function(req,res)
    {
        res.render('dash', {
            title: 'Verifyed Dash'
        });
    });

    app.get('/signup',function(req,res)
    {
        res.render('signup', {
            title: 'Verifyed Signup'
        });
    });

    app.post('/signup',function(req,res)
    {

        var signupConfirmData = [
            {
                organization: req.body.organization,
                fullname: req.body.firstname + ' ' + req.body.lastname,
                email: req.body.email,
                designation: req.body.designation,
                phone: req.body.phone
            }
        ]

        // var content = 'Organization: ' + req.body.organization;
        res.render('signup_confirm', {
            title: 'Verifyed Signup Confirmation',
            userdetails: signupConfirmData
        });
    });
};

