module.exports = {
   getIndex: (req,res)=>{

      res.render('index.ejs')
   },

   postLogin: (req, res) => {
      
   },

   getSignup: (req,res)=>{
      res.render('signup.ejs')
   }
}