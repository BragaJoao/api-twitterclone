const router = require('express').Router();

const tweetController = require('./tweet.controllers');
const authMiddleware = require("../auth/auth.middlewares");

router.post("/create", authMiddleware, tweetController.createTweetController);
router.get("/", authMiddleware, tweetController.findAllTweetsController);
router.get("/search", authMiddleware, tweetController.searchTweetController);
router.patch("/:id/like", authMiddleware, tweetController.likesTweetController);
router.patch("/:id/retweet", authMiddleware, tweetController.retweetsTweetController);
router.patch("/:id/comment", authMiddleware, tweetController.commentsTweetController);

module.exports = router;