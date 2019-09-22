
const express = require('express');
const router = express.Router();
const Comments = require("../../models/comments");

router.get('/', async (req,res) => {
    
    const comments = await Comments.find(); 
    res.json(comments);
    
})
router.get('/:id', async (req, res) => {
    const comment = await Comments.findById(req.params.id);
    res.json(comment);
  });
  
  // ADD a new comment
  router.post('/', async (req, res) => {
    const {username, topic, description,date } = req.body;
    const comment = new Comments({username,topic, description,date});
    await comment.save();
    res.json({status: 'Comment Saved'});
  });
  
  // UPDATE a new comment
  router.put('/:id', async (req, res) => {
    const { username, title, description,date } = req.body;
    const newComment = {username,title, description,date};
    await Comments.findByIdAndUpdate(req.params.id, newComment);
    res.json({status: 'Comment Updated'});
  });
  
  router.delete('/:id', async (req, res) => {
    await Comments.findByIdAndRemove(req.params.id);
    res.json({status: 'Comment Deleted'});
  });

  module.exports=router;