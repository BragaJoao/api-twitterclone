const userService = require("./users.services");

const createUserController = async (req, res) => {
  const { name, username, email, password, avatar } = req.body;

  if (!username || !name || !email || !password || !avatar) {
    return res.status(400).send({
      message:
        'Alguns campos estão faltando. Os campos são: "username", "name", "email", "password" ou "avatar". ',
    });
  }

  const foundUser = await userService.findByEmailUserService(email);

  if (foundUser) {
    return res.status(400).send({
      message: "Usuário já existe ",
    });
  }
  const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    return res.status(400).send({
      message: "Erro ao criar o usuário!",
    });
  }

  res.status(201).send(user);
};
const findAllUserController = async (req, res) => {
  const users = await userService.findAllUserService();

  if (users.lenght === 0) {
    return res.status(400).send({
      message: "Não existem usários cadastrados",
    });
  }
  res.send(users);
};

module.exports = {
  createUserController,
  findAllUserController,
};
