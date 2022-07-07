const User = require("./User");

const findByEmailUserService = (email) => User.findOne({ email: email });
const findByUserNameService = (username) => User.findOne({ username: username });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

module.exports = {
  findByEmailUserService,
  createUserService,
  findAllUserService,
  findByUserNameService,
};
