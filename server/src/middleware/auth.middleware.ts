import jwt from "jsonwebtoken";
import {ApiError} from "../exceptions/api_errors";
require('dotenv').config();

export const authenticateJWT = (req: any, res: any, next: any) => {
    const token = req.cookies.accessToken;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
            if (err) {
                return next(ApiError.Forbidden());
            }
            req.user = user;
            next();
        });
    } else {
        return next(ApiError.Unauthorized());
    }
};