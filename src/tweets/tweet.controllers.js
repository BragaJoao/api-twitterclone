const tweetService = require("./tweet.services");

const createTweetController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).send({
        message: "Envie todos os dados necessários para a criação do tweet",
      });
    }

    const { id } = await tweetService.createTweetService(message, req.userId);
    return res.status(201).send({
      message: "Tweet criado com sucesso!",
      tweet: { id, message },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllTweetsController = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const tweets = await tweetService.findAllTweetsService(offset, limit);

    const total = await tweetService.countTweets();

    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    /* URL/tweets/?limit=5&offset=5 */

    //PREVIEW (NAO VAI TER NO FRONT) ?->Si for, :->Se nao
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previuos != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (tweets.length === 0) {
      return res.status(400).send({ message: "Escreva seu primeiro tweet!" });
    }

    return res.send({
      previousUrl,
      nextUrl,
      limit,
      offset,
      total,
      results: tweets.map((tweet) => ({
        id: tweet._id,
        message: tweet.message,
        likes: tweet.likes.length,
        comments: tweet.comments.length,
        retweets: tweet.retweets.length,
        name: tweet.user.name,
        username: tweet.user.username,
        avatar: tweet.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchTweetController = async (req, res) => {
  const { message } = req.query;

  const tweets = await tweetService.searchTweetService(message);

  if (tweets.length === 0) {
    return res
      .status(400)
      .send({ message: "Não existem tweets com essa mensagem!" });
  }

  return res.send({
    tweets: tweets.map((tweet) => ({
      id: tweet._id,
      message: tweet.message,
      likes: tweet.likes.length,
      comments: tweet.comments.length,
      retweets: tweet.retweets.length,
      name: tweet.user.name,
      username: tweet.user.username,
      avatar: tweet.user.avatar,
    })),
  });
};

const likesTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetLiked = await tweetService.likesTweetService(id, userId);

  if (tweetLiked.lastErrorObject.n === 0) {
    return res.status(400).send({ message: "Você já deu like neste tweet." });
  }

  return res.send({ message: "Like realizado com sucesso" });
};

const retweetsTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetRetweeted = await tweetService.retweetsTweetService(id, userId);

  if (tweetRetweeted.lastErrorObject.n === 0) {
    return res
      .status(400)
      .send({ message: "Você já deu retweet neste tweet." });
  }

  return res.send({ message: "Ret realizado com sucesso" });
};

const commentsTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  await tweetService.commentsTweetService(id, userId);

  return res.send({ message: "Comentario realizado com sucesso" });
};

module.exports = {
  createTweetController,
  findAllTweetsController,
  searchTweetController,
  likesTweetController,
  retweetsTweetController,
  commentsTweetController,
};
