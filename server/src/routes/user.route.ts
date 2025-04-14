import express from 'express';
import UserController from '../controllers/user.controller';
import {body} from "express-validator";


export default (userController: UserController) => {
    const router = express.Router();

    router.post(
        '/registration',
        [
            body('name', 'Имя не может быть пустым').notEmpty(),
            body('email', 'Некорректный формат почты').isLength({
                min: 8,
            }),
            body('password', 'Пароль должен быть больше 8 символов').isLength({
                min: 8,
            }),
        ],
        userController.registration,
    )
    router.post('/login', userController.login);
    router.get('/users', userController.getAllUsers);
    router.get('/user/:id', userController.getUserById);
    router.put('/user/:id', userController.updateUser);
    router.delete('/user/:id', userController.deleteUser)

    return router;
}