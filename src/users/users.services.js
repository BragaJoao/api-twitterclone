const User = require("./User");

const findByEmailUserService = (email) => User.findOne({ email: email });
const findByUserNameService = (username) => User.findOne({ username: username });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

module.exports = {
  findByEmailUserService,
  createUserService,
  findAllUserService,
  findByUserNameService,
  findByIdUserService,
};
