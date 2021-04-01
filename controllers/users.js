const { User } = require('../models');

const getAllUsers = async (request, response, next) => { //Retrieve all users
    try {
        let userList = await User.findAll();
        response.status(200).send(userList);
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: error.message,
        });
        next(error);
    }
}

const createUser = async (request, response, next) => { //create a new user
    try {
        if (request.body === "" || request.body == null) {
            response.status(400).json({
                message: "Request body required",
            });
        } else {
            let user = await User.create(request.body);
            response.status(201).send(user);
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: error.message,
        });
        next(error);
    }
}

const getUserById = async (request, response, next) => { //Retrieve one user by id
    try {
        const id = request.params.id
        let user = await User.findByPk(id);
        if (user == null) {
            response.status(404).json({
                message: `User id ${id} not found`,
            });
            console.log(`User id ${id} not found`)
            next(`User id ${id} not found`)
        } else {
            request.user = user;
            next();
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: error.message,
        });
        next(error);
    }
}

const updateUserById = async (request, response, next) => { //Update one user by id    
    try {
        const userId = request.params.id;
        let user = await User.update(request.body, { where: { id: userId } })
        console.log(user)
        if (user == 1) {
            response.status(202).json({
                message: 'User updated',
            });
        } else {
            response.status(400).json({
                message: 'User NOT updated',
            });
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: error,
        });
        next(error);
    }
}

const deleteUserById = async (request, response, next) => { //Delete one user by id    
    try {
        const userId = request.params.id;
        let user = await User.destroy({ where: { id: userId } })
        console.log(user)
        if (user == 1) {
            response.status(204).send();
        } else {
            response.status(400).json({
                message: 'User NOT deleted',
            });
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: error,
        });
        next(error);
    }
}

export { getAllUsers, createUser, getUserById, updateUserById, deleteUserById }