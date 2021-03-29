import { startOfHour } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository'

interface RequestDTO {
    provider_id:string;
    date:Date;
}

class CreateAppointmentService {
    
    public async execute({provider_id, date}:RequestDTO):Promise<Appointment> {
        const appointmentRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(date);

        const findApponintmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

        if(findApponintmentInSameDate) {
            throw Error('This appointment is already booked')
        // return response.status(400).json({message: ''})
    }

    const appointment = appointmentRepository.create({
        provider_id,
        date:appointmentDate
    });
    await appointmentRepository.save(appointment)

    return appointment
    }
}
export default CreateAppointmentService;