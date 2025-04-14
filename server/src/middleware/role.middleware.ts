import jwt from "jsonwebtoken";
import {ApiError} from "../exceptions/api_errors";
import { IUser } from './../interfaces/IUser';

require('dotenv').config();

export const authorizeRole = (roles: string[]) => {
    return (req: any, res: any, next: any) => {
        const token = req.cookies.accessToken

        if (!token) {
            return next(ApiError.Unauthorized());
        }
        jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
            if (err) {
                console.error('Ошибка при расшифровке токена:', err);
                return next(ApiError.Forbidden());
            }

            req.user = decoded as IUser;

            if (!roles.includes(req.user.role)) {
                return next(ApiError.Forbidden());
            }

            next();
        });
    };
};