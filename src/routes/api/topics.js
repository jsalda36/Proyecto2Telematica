
const express = require('express');
const router = express.Router();
const Topics = require("../../models/topics");

router.get('/', async (req,res) => {
    
    const topics = await Topics.find(); 
    res.json(topics);
    
})
router.get('/:id', async (req, res) => {
    const topic = await Topics.findById(req.params.id);
    res.json(topic);
  });
  
  // ADD a new topic
  router.post('/', async (req, res) => {
    const {username, title, description,date } = req.body;
    const topic = new Topics({username,title, description,date});
    await topic.save();
    res.json({status: 'Topics Saved'});
  });
  
  // UPDATE a new topic
  router.put('/:id', async (req, res) => {
    const { username, title, description,date } = req.body;
    const newTopic = {username,title, description,date};
    await Topics.findByIdAndUpdate(req.params.id, newTopic);
    res.json({status: 'Topics Updated'});
  });
  
  router.delete('/:id', async (req, res) => {
    await Topics.findByIdAndRemove(req.params.id);
    res.json({status: 'Topics Deleted'});
  });

  module.exports=router;