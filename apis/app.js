let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
    morgan = require('morgan'),
    mongoose  = require('mongoose'),
    config = require('./config'),
    User = require('./modal/user'); // get our user model

// =================================================================
// configuration ===================================================
// =================================================================
const port = process.env.PORT || 9000 // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))
app.set('superSecret', config.secret); // secret variable


// basic route (http://localhost:8080)
app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api')
})
// create user


// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
let apiRoutes = express.Router();
app.post('/create', function(req, res) {

	// create a sample user
	var userData = new User({
		name: 'sumn2u@gmail.com',
		password: 'suman123',
		admin: true
	});
	userData.save(function(err, user) {
		if(err){
			if (err.name === 'MongoError' && err.code === 11000) {
					res.json({error: "There was a duplicate key error"});
	    } else {
		      res.json({error: "Application error"});
	     }

	  }
		console.log('User saved successfully');
		res.json({ success: true, user:user });
	});
});

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {
    // console.log("re", req.body.username);
        // find the user
        User.findOne({
            name: req.body.username
        }, function(err, user) {
        console.log("user", user);
            if (err) throw err;

             if (user) {

                // Make sure the password is correct
                console.log('lks', req.body)
              user.verifyPassword( req.body.password, function(err, isMatch) {
                    if (err) { return res.json({ success: false, message: 'Authentication failed. ' });}

                    // Password did not match
                    if (!isMatch) { return  res.send(401,{ success: false, message: 'Authentication failed. Wrong password.' }); }
                    // console.log("user", user);
                    // Success

                                            // if user is found and password is right
                                            // create a token
                                            console.log('user' , user)
                                            var token = jwt.sign(user, app.get('superSecret'), {
                                                expiresIn: 86400 // expires in 24 hours
                                            });

                                        return	res.json({
                                              success:true,
                                                token: token,
                                                message:'enjoy your token'
                                            });
                  });
                // check if password matches
                // if (user.password != req.body.password) {
                // 	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                // } else {

                // }

            }else{
                     res.send(401,{ success: false, message: 'Authentication failed. User not founds.' });

            }

        });
    });


    // ---------------------------------------------------------
    // route middleware to authenticate and check token
    // ---------------------------------------------------------
    // apiRoutes.use(function(req, res, next) {
    //
    // 	// check header or url parameters or post parameters for token
    // 	var token = req.body.token || req.param('token') || req.headers['x-access-token'] || req.headers['authorization'];
    //
    // 	// decode token
    // 	if (token) {
    //
    // 	//  console.log("token",token,  app.get('superSecret') );
    // 		// verifies secret and checks exp
    // 		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    // 			// console.log("dfdfg", decoded, err);
    // 			if (err) {
    // 				return res.json({ success: false, message: 'Failed to authenticate token.' });
    // 			} else {
    // 				// if everything is good, save to request for use in other routesr
    // 				next();
    // 			}
    // 		});
    //
    // 	}
    // 	else {
    //
    // 		// if there is no token
    // 		// return an error
    // 		return res.status(403).send({
    // 			success: false,
    // 			message: 'No token provided.'
    // 		});
    //
    // 	}
    //
    // });

    // ---------------------------------------------------------
    // authenticated routes
    // ---------------------------------------------------------
apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users)
	})
})

    //CORS middleware for expres...
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
next();
});


app.use('/api', apiRoutes)
// =================================================================
// start the server ================================================
// =================================================================
app.listen(port)
console.log('Magic happens at http://localhost:' + port)
