const authService = require("./auth.services");

const loginController = async(req, res) => {
    res.send( {message: "login OK"})
}

module.exports = {loginController};