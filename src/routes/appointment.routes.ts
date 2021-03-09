import {Router} from 'express';
import { parseISO} from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';



//parseIso = converte a data em um componente nativo do Js o Date();

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository()

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.all();

    return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date} = request.body;

    // const parsedDate = startOfHour(parseISO(date));

    const parsedDate  = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentRepository)
    const appointment = createAppointment.execute({date:parsedDate, provider})
    
    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({error: error.message})   
  }
})



// appointmentsRouter.post('/', (request, response) =>{
//     return response.json({message: 'Hey You'})
// })

export default appointmentsRouter;