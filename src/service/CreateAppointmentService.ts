import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository'

interface RequestDTO {
    provider:string;
    date:Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;
    constructor(appointmentRepository: AppointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }
    public execute({provider, date}:RequestDTO):Appointment {
        const appointmentDate = startOfHour(date);

        const findApponintmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);

        if(findApponintmentInSameDate) {
            throw Error('This appointment is already booked')
        // return response.status(400).json({message: ''})
    }

    const appointment = this.appointmentRepository.create({
        provider,
        date:appointmentDate
    });
    return appointment
    }
}
export default CreateAppointmentService;