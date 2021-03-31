import express, { request, response } from 'express';
const router = express.Router();
const users = require('../models').users

router.route('/')
  .get(async (request, response, next) => { //Retrieve all users
    try {
      let userList = await users.findAll();
      response.status(200).send(userList);
    } catch (error) {
      console.log(error)
      response.status(500).json({
        message: error,
      });
      next(error);
    }
  }).post(async (request, response, next) => { //create a new user
    try {
      if (request.body === "" || request.body == null) {
        response.status(400).json({
          message: "Request body required",
        });
      } else {
        let user = await users.create(request.body);
        response.status(201).send(user);
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({
        message: error,
      });
      next(error);
    }
  })
router.use('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    let user = await users.findByPk(id);

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
      message: error,
    });
    next(error);
  }
})
router.route('/:id')
  .get((request, response, next) => { //Retrieve one user by id
    response.status(200).send(request.user);
  })
  .put(async (request, response, next) => { //Update one user by id    
    try {
      const userId = request.params.id;
      let user = await users.update(request.body, { where: { id: userId } })
      console.log(user)
      if (user === 1) {
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
  })
  .delete(async (request, response, next) => { //Delete one user by id    
    try {
      const userId = request.params.id;
      let user = await users.destroy({ where: { id: userId } })
      console.log(user)
      if (user === 1) {
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
  })
export default router;
