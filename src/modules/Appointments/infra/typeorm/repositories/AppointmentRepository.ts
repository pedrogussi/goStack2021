
import {getRepository, Repository} from 'typeorm';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/Appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

// interface CreateAppointmentDTO {
//     provider: string,
//     date: Date
// }


// implements IAppointmentsRepository  define um escopo de regras, determinando na interface IAppointmentsRepository


class AppointmentRepository implements IAppointmentsRepository {

    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment)
    }
  
    public async findByDate(date:Date): Promise<Appointment | undefined>{
        // const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));
        const findAppointment = await this.ormRepository.findOne({
            where: {date: date},
        })
        return findAppointment;
    }
    public async create({date, provider_id}: ICreateAppointmentDTO):Promise<Appointment>{
        const appointment = this.ormRepository.create({date, provider_id});

        await this.ormRepository.save(appointment)
        

        return appointment;

    }
}   


export default AppointmentRepository;