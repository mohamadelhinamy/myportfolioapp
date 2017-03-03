var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/',ensureAuthenticated, function(req, res){
	res.render('index');
});


function ensureAuthenticated(req,res,next){
     if(req.isAuthenticated()){
          return next();
     }else{
     	//req.flash('error_msg','Login or register for free to be able to see your profile')
        res.redirect('/users/register')
     }
}

module.exports = router;