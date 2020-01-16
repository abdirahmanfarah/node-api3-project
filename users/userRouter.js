const express = require('express');

const router = express.Router();


const User = require('./userDb.js');

const Post = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  // console.log(req.body)
  User.insert(req.body)
  
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error adding the User"})
    });

});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  Post.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error adding the post"})
    })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "We can't get any users"})
    })

});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.getById(req.params.id)
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "User could not be found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error retrieving the User"})
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving the user's post"})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: "User deleted"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error deleting the user"})
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const changes = req.body;
  User.update(req.params.id, changes)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Error updating the user"})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  // console.log(req.params.id);
  // const id = req.params.id;
  if(req.params.id === req.params.id) {
    
    next();
  } else {
    res.status(400).json({message: 'Invalid user id'})
  }
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.body);
  if(!req.body || Object.keys(req.body).length === 0 ){
    res.status(400).json({ message: "missing user data" })
  }else if(!req.body.name) {
    res.status(404).json({ message: "missing required name field"})
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  console.log(req.body)
  if(!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data"})
  }else if(!req.body.text && !req.body.user_id) {
    res.status(404).json({ message: "missing required text field"})
  }
  next();
}

module.exports = router;
