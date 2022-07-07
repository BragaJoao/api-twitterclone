const authService = require("./auth.services");
const bcrypt = require('bcryptjs');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginService(email);

  if (!user) {
    return res.status(400).send({ message: " Usuário não encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  
  if (!isPasswordValid){
    return res.status(400).send( {message: "Senha Invalida"})
  }

  res.send(user);
};

module.exports = { loginController };
