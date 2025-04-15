import UserModel from "../models/user.dal";
import { ICreateUserData } from "../interfaces/ICreateUserData";
import { INewUser } from "../interfaces/INewUser";
import { ApiError } from "../exceptions/api_errors";
import bcrypt from 'bcrypt';
import TokenService from "./token.service";
import { ILoginData } from "../interfaces/ILoginData";
import dotenv from 'dotenv';

dotenv.config();

class UserService {
    private userModel: UserModel;
    private tokenService: TokenService;
    
    constructor(userModel: UserModel, tokenService: TokenService) {
        this.userModel = userModel;
        this.tokenService = tokenService;
    }   

    async registration(userData: INewUser) {
        const existingUser = await this.userModel.getByEmail(userData.email)
    
        if (existingUser) {
            throw ApiError.BadRequest(`Пользователь с такой почтой - ${userData.email} уже существует`);
        }
    
        const hashedPassword = await bcrypt.hash(userData.password, 10);
            
        const newUserData = {
            id: userData.id,
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            password: hashedPassword,
            role: process.env.USER_ACCESS! 
        };
    
        await this.userModel.create(newUserData);
    
        const user = await this.userModel.getByEmail(userData.email);
        const role = user.role;
    
        const accessToken = this.tokenService.generateToken({
            id: user.id,
            name: user.name,
            role: user.role
        });
    
        return { accessToken, role };
    }
    

    async login(userData: ILoginData) {
        const user = await this.userModel.getByEmail(userData.email);

        if (user && (await bcrypt.compare(userData.password, user.password))) {
            const accessToken = this.tokenService.generateToken({
                id: user.id, 
                name: user.name,
                role: user.role,
            });

            const role = user.role;

            return{accessToken, role};
        } else {
            throw ApiError.BadRequest('Неверный пароль или email');
        }
    }

    async getAllUsers() {
        return await this.userModel.getAll();
    }

    async getUserById(id: number) {
        return await this.userModel.getById(id);
    }

    async updateUser (id: number, userData: ICreateUserData ) {
        const existingUser = await this.userModel.getById(id)

        if (!existingUser) {
            throw new Error (`Пользователь с ID ${id} не найден`)
        }

        return this.userModel.update(id, userData);
    }

    async deleteUser (id: number) {
        return this.userModel.delete(id);
    }
}

export default UserService;