import {getRepository} from 'typeorm';
import {hash} from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '@shered/errors/AppError'


interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({name,email,password}:Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
            where: {email},
        });
        if(checkUserExists) {
            throw new AppError('Email addres already used!')
        }

        const hashPassword = await hash(password, 8);

        const user = usersRepository.create({
          name,
          email,
          password: hashPassword,
        });

        await usersRepository.save(user);
        return user;
    } 
}