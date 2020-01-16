const express = require('express');

const router = express.Router();

const Post = require('./postDb');

router.get('/',validatePostId, (req, res) => {
  // do your magic!
  Post.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "We can't get any posts"})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  Post.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "This post can't be retrieved"})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Post.remove(req.params.id)
    .then(post => {
      res.status(200).json({message: "post deleted"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Post could not be deleted"})
    })
});

router.put('/:id',validatePostId, (req, res) => {
  // do your magic!
  const changes = req.body;
  Post.update(req.params.id, changes)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Post could not be updated"})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if(req.params.id === req.params.id){
    next();
  } else {
    res.status(400).json({message: "Invalid Post"})
  }
}

module.exports = router;
