import db from "../db";
import { ICreateClientData } from "../interfaces/ICreateClientData";
import { ApiError } from "../exceptions/api_errors";

class ClientModel {
    async create(clientData: ICreateClientData) {
        try {
            const query = db('clients');
            await query.insert(clientData)
        } catch (err) {
            console.error('Error creating client', err);
            throw err;
        }
    }
    async getById(id: string) {
        try {
            const query = db('clients');
            return await query.where('id', id).first();
        } catch (err) {
            console.error('Error fetching client by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)]
            ApiError.BadConnectToDB(errorArray)
        }
    }
    async getAll() {
        try {
            const query = db('clients');
            return await query.select('*');
        } catch (err) {
            console.error('Error fetching all clients', err)
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray);
        }
    }
    async update (id: string, clientData: ICreateClientData) {
        try {
            const query = db('clients');
            return await query.where('id', id).update({
                name: clientData.name,
                phone: clientData.phone,
                email: clientData.email
            });
        } catch (err) {
            console.error('Error updating client by id', err) 
            throw err;
        }
    }
    async delete(id: string) {
        try {
            const query = db('clients');
            await query.where('id', id).delete();
        } catch(err) {
            console.error('Error delete client by id', err) 
            throw err;
        }
    }
}

export default ClientModel;

