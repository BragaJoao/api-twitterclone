const createUserController = async (req, res) => {
    res.send({ message: 'create OK' })
};
const findAllUserController = async (req, res) => {
    res.send({ message: 'FindAll OK' })
};

module.exports = {
    createUserController,
    findAllUserController
}