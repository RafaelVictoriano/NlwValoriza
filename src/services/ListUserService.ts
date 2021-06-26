import {getCustomRepository} from "typeorm";
import {UsersRepositories} from "../repositories/UsersRepositories";
import {logger} from "../logger";

class ListUserService {
    async execute() {
        const userRepository = getCustomRepository(UsersRepositories);


        logger.info(`Seeking out users:`);
        const users = await userRepository.find();

        return users;
    }
}

export {ListUserService}