const passport = require("passport")
const validator = require("validator")
const User = require('../models/User')

module.exports = {
   getIndex: (req,res)=>{

      res.render('index.ejs')
   },

   postLogin: (req, res, next) => {
      const validationErrors = []
      if(!validator.isEmail(req.body.email))
        validationErrors.push({msg: "please enter  valid email address."})
      if(validator.isEmpty(req.body.password))
        validationErrors.push({msg: "password cannot be blank."})

      if(validationErrors.length){
         req.flash("error", validationErrors)
         return res.redirect("/index")
      }
      req.body.email = validator.normalizeEmail(req.body.email, {
         gmail_remove_dots: false
      })

      passport.authenticate("local", (err,user,info)=>{
         if(err){
            return next(err)
         }
         if(!user){
            req.flash("errors", info)
            return res.redirect("/")
         }
         req.logIn(user, (err)=>{
            if(err){
               return next(err)
            }
            req.flash("success", {msg: "Success! you are logged in."})
            res.redirect(req.session.returnTo || "/profile")
         })
      })(req, res, next)
   },

   getSignup: (req,res)=>{
      if(req.user){
         return res.redirect("/profile")
      }
      res.render('signup.ejs')
   },

   postSignup: async (req,res,next)=>{
      const validationErrors = []
      if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." })
      if (!validator.isLength(req.body.password, {min: 8}))
        validationErrors.push({msg: "Password must be at list 8 charaters long"})
      if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({msg: "password do not match"})
      if (validationErrors.length){
         req.flash("errors", validationErrors)
         return res.redirect("../signup")
      }
      req.body.email = validator.normalizeEmail(req.body.email, {
         gmail_remove_dots: false,
      })

      const user = new User({
         userName: req.body.userName,
         email: req.body.email,
         password: req.body.password
      })

      try {
         const existingUser = await User.findOne(
            { $or: [
               {email: req.body.email}, 
               {userName: req.body.userName}] 
            }
         )

         if(existingUser){
            req.flash("errors", {
               msg: "Account with that email address or username already exists"
            })
            return res.redirect("../signup")
         }

         user.save(User)

         req.login(user, (err)=>{
            if (err){
               return next(err)
            }
            res.redirect("/profile")
         })
         

      } catch (err) {
         console.log(err)
      }
   },

   getLogout: (req, res)=>{
      if(req.user){
         res.destroy((err) => {
            if (err)
              console.log("Error : Failed to destroy the session during logout.", err);
            req.user = null
         })
         req.logout(()=>{console.log("User has logged out.")})
      }
      res.redirect("/")
   }
}