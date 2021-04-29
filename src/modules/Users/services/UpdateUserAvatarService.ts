import {getRepository} from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

import AppError from '@shered/errors/AppError'
import IUserRepositoroies from '../repositories/IUsersRepositories';

 
interface Request {
    user_id: string;
    avatarFilename: string;
}
export default class UpdateUserAvatarService {
    constructor(private usersRepository: IUserRepositoroies) {}


    public async execute({user_id, avatarFilename}:Request): Promise<User>{

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('Only Authenticated users can change Avatar', 401)
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await this.usersRepository.save(user);

        return user;
    }
}