import db from "../db";
import { ApiError } from "../exceptions/api_errors";
import { IAppointmentsData } from "../interfaces/IAppointmentsData";

class AppointmentModel {
    async getById(id: number) {
        try {
            const query = db('appointments');
            return await query.where('id', id).first();
        } catch (err) {
            console.error('Error fetching appointment by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)]
            ApiError.BadConnectToDB(errorArray)
        }
    }
    async getAll() {
        try {
            const query = db('appointments');
            return await query.select('*');
        } catch (err) {
            console.error('Error fetching all appointments', err)
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray);
        }
    }
    async update (id: number, appointmentData: IAppointmentsData) {
        try {
            const query = db('appointments');
            return await query.where('id', id).update({
                appointment_date: appointmentData.appointment_date,
                status: appointmentData.status,
                notes: appointmentData.notes
            });
        } catch (err) {
            console.error('Error updating appointment by id', err) 
            throw err;
        }
    }
    async delete(id: number) {
        try {
            const query = db('appointments');
            await query.where('id', id).delete();
        } catch(err) {
            console.error('Error delete appointment by id', err) 
            throw err;
        }
    }
}

export default AppointmentModel;

