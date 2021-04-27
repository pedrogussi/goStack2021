import {Router} from 'express';
import { parseISO} from 'date-fns';
import {getCustomRepository} from 'typeorm'
import AppointmentRepository from '@modules/Appointments/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated';




//parseIso = converte a data em um componente nativo do Js o Date();

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {

    // console.log(request.user)
    const appointmentRepository = getCustomRepository(AppointmentRepository)
    const appointments =  await appointmentRepository.find();

    return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  
    const { provider_id, date} = request.body;

    // const parsedDate = startOfHour(parseISO(date));

    const parsedDate  = parseISO(date);
   
    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({date:parsedDate, provider_id})
    
    return response.json(appointment)
  
})



// appointmentsRouter.post('/', (request, response) =>{
//     return response.json({message: 'Hey You'})
// })

export default appointmentsRouter;