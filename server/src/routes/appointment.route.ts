import express from 'express';
import AppointmentController from '../controllers/appointment.controller';


export default (appointmentController: AppointmentController) => {
    const router = express.Router();

    router.get('/appointment', appointmentController.getAllAppointments);
    router.get('/appointment/:id', appointmentController.getAppointmentById);
    router.put('/appointment/:id', appointmentController.updateAppointment);
    router.delete('/appointment/:id', appointmentController.deleteAppointment)

    return router;
}