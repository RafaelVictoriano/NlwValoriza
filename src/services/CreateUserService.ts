import {UsersRepositories} from "../repositories/UsersRepositories";
import {getCustomRepository} from "typeorm";
import { hash } from "bcryptjs"
import {logger} from "../logger";

interface IUserRequest {
    name: string;
    email: string;
    password: string
    admin?: boolean;
}

class CreateUserService{
    async execute({name, email, admin = false, password}: IUserRequest) {
        const userRepository = getCustomRepository(UsersRepositories);

        if(!email) {
            logger.error(`Email : ${email} is incorrect`);
            throw new Error('Email is incorrect');
        }

        logger.info(`Seeking out user:${name}`);
        const userAlreadyExists = await userRepository.findOne({
            email
        }) ;

        if(userAlreadyExists) {
            logger.error(`User: ${name} is already exists`);
            throw new Error('User is already exists');
        }
        const hashPassword = await hash(password, 8);

        logger.info(`Create user:${name}`);
        const user = userRepository.create({
            name,
            email,
            password: hashPassword,
            admin
        });
        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService }