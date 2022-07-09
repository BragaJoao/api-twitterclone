const router = require('express').Router();

const tweetController = require('./tweet.controllers');
const authMiddleware = require("../auth/auth.middlewares");

router.post("/create", authMiddleware, tweetController.createTweetController);

module.exports = router;