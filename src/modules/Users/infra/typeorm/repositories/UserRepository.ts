
import {getRepository, Repository} from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import User from '../entities/User';
import IUserRepositoroies from '@modules/Users/repositories/IUsersRepositories';

// interface CreateAppointmentDTO {
//     provider: string,
//     date: Date
// }


// implements IAppointmentsRepository  define um escopo de regras, determinando na interface IAppointmentsRepository


class UsersRepository implements IUserRepositoroies {

    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }
    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {email}
        });
        return user;
    }
    
  
  
    public async create({name, email, password}: ICreateUserDTO):Promise<User>{
        const user = this.ormRepository.create({name, email, password});

        await this.ormRepository.save(user)
        

        return user;

    }
    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user)
    }
}   


export default UsersRepository;