import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import authConfig from '@config/Auth';

import AppError from '@shered/errors/AppError'
import IUserRepositoroies from '../repositories/IUsersRepositories';


interface Request {
    email: string;
    password:string
}
interface Response {
    user: User;
    token:string;
}

export default class AuthenticateUserService {
    constructor(private usersRepository: IUserRepositoroies) {}


    public async execute({email, password}:Request): Promise<Response> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Incorrect email/password combination.', 401);

        }
        //password = senha sem cript;
        //user.password = senha com cript;
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        } );

        return {
            user,
            token,
        }
    }
}