import User from '../infra/typeorm/entities/User';
import ICreateUserdDTO  from '../dtos/ICreateUserDTO';

export default interface IUserRepositoroies {   
    findById(id: string) : Promise<User | undefined>;
    findByEmail(email: string) : Promise<User | undefined>;
    create(data: ICreateUserdDTO):  Promise<User>;
    save(user: User): Promise<User>;
}
