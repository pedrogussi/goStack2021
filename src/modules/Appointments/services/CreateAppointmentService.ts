import { startOfHour } from 'date-fns';
import {inject, injectable} from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shered/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';



interface RequestDTO {
    provider_id:string;
    date:Date;
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
       private appointmentsRepository: IAppointmentsRepository,
    ) {

    }
    
    public async execute({provider_id, date}:RequestDTO):Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findApponintmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if(findApponintmentInSameDate) {
            throw new AppError('This appointment is already booked')
        // return response.status(400).json({message: ''})
    }

    const appointment = await this.appointmentsRepository.create({
        provider_id,
        date:appointmentDate
    });

    return appointment
    }
}
export default CreateAppointmentService;