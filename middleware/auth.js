
//is user is authenticated (aka logged in? ) if they are move onto the next thing;  else (if they're not) redirect them back to the main pg /
//passport and sessions etc are doing the authentication for us to check if the user is logged in

module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }


  