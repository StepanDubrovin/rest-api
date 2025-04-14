import db from "../db";
import { ICreateUserData } from "../interfaces/ICreateUserData";
import { ApiError } from "../exceptions/api_errors";

class UserModel {
    async create(userData: ICreateUserData) {
        try {
            const query = db('users');
            await query.insert(userData)
        } catch (err) {
            console.error('Error creating user', err);
            throw err;
        }
    }
    async getById(id: number) {
        try {
            const query = db('users');
            return await query.where('id', id).first();
        } catch (err) {
            console.error('Error fetching user by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)]
            ApiError.BadConnectToDB(errorArray)
        }
    }

    async getByEmail(email: string) {
        try {
            const query = db('users');
            return await query.where('email', email).first();
        } catch (err) {
            console.error('Error fetching user by email', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async getAll() {
        try {
            const query = db('users');
            return await query.select('*');
        } catch (err) {
            console.error('Error fetching all clients', err)
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray);
        }
    }
    async update(id: number, userData: ICreateUserData) {
        try {
            const query = db('users');
            return await query.where('id', id).update({
                name: userData.name,
                phone: userData.phone,
                email: userData.email
            });
        } catch (err) {
            console.error('Error updating user by id', err) 
            throw err;
        }
    }
    async delete(id: number) {
        try {
            const query = db('users');
            await query.where('id', id).delete();
        } catch(err) {
            console.error('Error delete user by id', err) 
            throw err;
        }
    }
}

export default UserModel;

