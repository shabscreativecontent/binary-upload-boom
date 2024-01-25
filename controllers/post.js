const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")

module.exports = {
   getProfile: async(req,res)=>{
      try {
         const posts = await Post.find({ user: req.user.id })
         res.render("profile.ejs", { posts: posts, user: req.user })
      } catch (err) {
         console.log(err)
      }
   },

   getPost: async(req,res)=>{
      try {
         const post = await Post.findById(req.params.id)
         
         res.render("post.ejs", { post: post, user: req.user })
      } catch (err) {
         console.log(err);
      }
   },

   getFeed: async(req, res)=>{
      try {
         const posts = await Post.find({})
      
         res.render("feed.ejs", { posts: posts, user: req.user })
      } catch (err) {
         console.log(err);
      }
   },
   
   createPost: async (req, res)=>{
      // Upload image to cloudinary
      try {
         const result = await cloudinary.uploader.upload(req.file.path);

         await Post.create({
         title: req.body.title,
         image: result.secure_url,
         cloudinaryId: result.public_id,
         caption: req.body.caption,
         likes: 0,
         user: req.user.id,
         })
         console.log("Post has been added")
         res.redirect("/profile")
      } catch (err) {
         console.log(err);
      }
   },

   likePost: async(req,res)=>{
      try {
         await Post.findOneAndUpdate({_id: req.params.id},
            {
               $inc: { likes: 1 },
            }
         )
         console.log("Like +1");
         res.redirect(`/post/${req.params.id}`)
      } catch (err) {
         console.log(err);
      }
   },

   deletePost: async(req,res)=>{
      try {
         // find post by id
         let deletepost = await Post.findById({_id: res.params.id})
         // delete image from cloudinary
         await cloudinary.uploader.destroy(Post.cloudinaryId)
         // delete post from DB
         await Post.remove({_id: req.params.id})
         console.log("Deleted post");
         res.redirect("/profile")
      } catch (err) {
         console.log(err)
      }
   }
}