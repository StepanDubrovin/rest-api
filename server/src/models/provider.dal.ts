import db from "../db";
import { IProviderData } from "../interfaces/IProviderData";
import { ApiError } from "../exceptions/api_errors";

class ProviderModel {
    async getById(id: number) {
        try {
            const query = db('providers');
            return await query.where('id', id).first();
        } catch (err) {
            console.error('Error fetching provider by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)]
            ApiError.BadConnectToDB(errorArray)
        }
    }
    async getAll() {
        try {
            const query = db('providers');
            return await query.select('*');
        } catch (err) {
            console.error('Error fetching all providers', err)
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray);
        }
    }
    async update (id: number, providerData: IProviderData) {
        try {
            const query = db('providers');
            return await query.where('id', id).update({
                name: providerData.name,
                price: providerData.price,
                text: providerData.text
            });
        } catch (err) {
            console.error('Error updating provider by id', err) 
            throw err;
        }
    }
    async delete(id: number) {
        try {
            const query = db('providers');
            await query.where('id', id).delete();
        } catch(err) {
            console.error('Error delete provider by id', err) 
            throw err;
        }
    }
}

export default ProviderModel;
