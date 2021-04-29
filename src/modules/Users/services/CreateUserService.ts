import {hash} from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '@shered/errors/AppError'
import IUserRepositoroies from '../repositories/IUsersRepositories';


interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    constructor(private usersRepository: IUserRepositoroies) {}

    public async execute({name,email,password}:Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if(checkUserExists) {
            throw new AppError('Email addres already used!')
        }

        const hashPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
          name,
          email,
          password: hashPassword,
        });
        return user;
    } 
}