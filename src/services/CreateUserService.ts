import {UsersRepositories} from "../repositories/UsersRepositories";
import {getCustomRepository} from "typeorm";
import { hash } from "bcryptjs"

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
            throw new Error('Email is incorrect');
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        }) ;

        if(userAlreadyExists) {
            throw new Error('User is already exists');
        }
        const hashPassword = await hash(password, 8);
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