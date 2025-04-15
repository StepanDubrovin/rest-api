import express from 'express';
import UserController from '../controllers/user.controller';
import {body} from "express-validator";
import { authenticateJWT } from '../middleware/auth.middleware';


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
    router.post('/logout', userController.logout);
    router.get('/users',/*  authenticateJWT, */ userController.getAllUsers);
    router.get('/user/:id', authenticateJWT ,userController.getUserById);
    router.put('/user/:id', authenticateJWT ,userController.updateUser);
    router.delete('/user/:id', authenticateJWT, userController.deleteUser);
    router.get('/checkAuth', authenticateJWT, userController.checkAuth);

    return router;
}