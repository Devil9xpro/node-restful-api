const express = require('express')
const {body} = require('express-validator/check')

const feedController = require('../controller/feeds-controller')

const router = express.Router()
//feed
router.get('/posts', feedController.getPosts)
router.post('/post', [
    body('title').trim().isLength({min:7}),
    body('content').trim().isLength({min: 5})
], feedController.createPost)
router.get('/post/:postId', feedController.getPost)

module.exports = router
