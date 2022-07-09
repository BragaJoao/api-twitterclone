const userService = require("./users.services");
const authService = require("../auth/auth.services");

const createUserController = async (req, res) => {
  const { name, username, email, password, avatar } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).send({
      message:
        'Alguns campos estão faltando. Os campos são: "username", "name", "email" ou "password". ',
    });
  }

  const foundUser = await userService.findByEmailUserService(email);
  const foundUserName = await userService.findByUserNameService(username)


  if (foundUserName) {
    return res.status(400).send({
      message: "Username já existe! ",
    });
  }

  if (foundUser) {
    return res.status(400).send({
      message: "Email já foi já foisa usado para cadastro! ",
    });
  }
  const user = await userService
    .createUserService(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    return res.status(500).send({
      message: "Erro ao criar o usuário!",
    });
  }

  const token = authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user.id,
      name,
      username,
      email,
      avatar,
    },
    token,
  });
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
