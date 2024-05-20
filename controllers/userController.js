const UserService = require('../services/userService');


//instanciar el servicio de usuario
const userService= new UserService();

// Controlador para obtener todos los usuarios
const getUsers = async (req,res) => {
    try {
        //llamar al método del servicio para obtener los usuarios
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error getting users' });
    }
};

const getUserByDni = async (req, res) => {
    try {
        //llamar al método del servicio para obtener un usuario por su DNI
        const user = await userService.getUserByDni(req.params.dni);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error getting user by Dni' });
    }
}

const createUser = async (req, res) => {
    try {
        //llamar al método del servicio para crear un usuario
        await userService.createUser(req.body);
        res.status(200).json("User created successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error creating user ' });
    }
};

const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.params.dni, req.body);
        res.status(200).json("User updated successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error updating user'}); // Enviar el mensaje de error real
    }
};


const deleteUser = async (req, res) => {
    try {
        //llamar al método del servicio para eliminar un usuario
        const user = await userService.deleteUser(req.params.dni);
        res.status(200).json("User  deleted successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
}

// 


module.exports = {
    getUsers,
    createUser,
    getUserByDni,
    updateUser,
    deleteUser
};