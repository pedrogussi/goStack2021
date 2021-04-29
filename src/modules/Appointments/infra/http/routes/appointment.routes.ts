import {Router} from 'express';
import AppointmentController from '../controllers/AppointmentController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated';




//parseIso = converte a data em um componente nativo do Js o Date();

const appointmentsRouter = Router();
const appointmentController = new AppointmentController()
appointmentsRouter.use(ensureAuthenticated)
appointmentsRouter.post('/', appointmentController.create)



export default appointmentsRouter;