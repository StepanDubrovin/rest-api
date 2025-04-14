import jwt, { SignOptions } from 'jsonwebtoken';
import { IToken } from '../interfaces/IToken';
import dotenv from 'dotenv';

dotenv.config();


class TokenService {
    generateToken(payload: IToken) {
        const jwtSecret = process.env.JWT_SECRET;
        const sessionDuration = (process.env.SESSION_DURATION || '30m') as SignOptions['expiresIn'];
        
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined')
        }

        return jwt.sign(payload, jwtSecret, { expiresIn: sessionDuration});
    }

    validateAccessToken(token: string) {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined')
        }

        try {
            return jwt.verify(token, jwtSecret);
        } catch (e) {
            return null
        }
    }
}

export default TokenService;