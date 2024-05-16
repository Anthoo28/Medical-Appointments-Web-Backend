const User = require('../models/user');
const UserDto = require('../dto/userDto');
const bcrypt= require('bcrypt')

class UserService {
    constructor() {
        // Aquí puedes inicializar cualquier configuración necesaria para el servicio de usuario
    }
    
    // Método para obtener todos los usuarios
    async getAllUsers() {
        try {
            const users = await User.find({ status: true });
            // Transformar los datos del modelo de usuario a DTO antes de devolverlos
            return users.map(user => new UserDto(user));
        } catch (error) {
            throw new Error('Error getting users');
        }
    }

    // Método para obtener un usuario por su DNI
    async getUserByDni(dni){
        try {
            const user = await User.findOne({ dni: dni, status: true });
            if (!user) {
                throw new Error('User not found');
            }
            return new UserDto(user);
        } catch (error) {
            throw new Error('Error getting user by Dni');
        }
    }

    // Método para crear un usuario
    async createUser(userData){
        try {
            // Crear un nuevo usuario con los datos recibidos
            const {password, ...rest} = userData;
            const user = new User(userData);
            //hash password
            const salt= bcrypt.genSaltSync();
            user.password= bcrypt.hashSync(password, salt);
            // Guardar el usuario en la base de datos
            await user.save();
            // Devolver el usuario recién creado como DTO
            return new UserDto(user);
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    async updateUser(dni, userData) {
        try {
            // Buscar el usuario por su DNI y que esté activo
            const user = await User.findOne({ dni: dni, status: true });
            if (!user) {
                throw new Error('User not found');
            }
            //hash password
            if(user.password !== userData.password){
                const salt= bcrypt.genSaltSync();
                userData.password= bcrypt.hashSync(userData.password, salt);

            }
            // Actualizar los datos del usuario
            Object.assign(user, userData);
            await user.save();
            // Devolver el usuario actualizado como DTO
            return new UserDto(user);
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    async deleteUser(dni){
        try {
            const user = await User.findOne({ dni: dni, status: true });
            if (!user) {
                throw new Error('User not found');
            }
            user.status = false;
            await user.save();
            return new UserDto(user);
            
        } catch (error) {
            throw new Error('Error deleting user');
            
        }

    }



}

module.exports = UserService;
