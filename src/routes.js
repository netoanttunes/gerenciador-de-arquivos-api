const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require("./models/Post");

routes.get("/posts", async (req, res) => {
    const posts = await Post.find();
  
    return res.json(posts);
  });
  

routes.post('/posts', multer(multerConfig).single('file') ,async(req,res) => {
    const post = await Post.create({
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url: req.file.url,
      });
    return res.json(post)
});

routes.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    await post.remove();
  
    return res.send();
  });

module.exports = routes;