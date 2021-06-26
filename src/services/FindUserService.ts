import {getCustomRepository} from "typeorm";
import {UsersRepositories} from "../repositories/UsersRepositories";
import {logger} from "../logger";

class FindUserService {
    async execute(id) {
        const userRepository = getCustomRepository(UsersRepositories);

        logger.info(`Seeking out user: ${id}`);
        const user = await userRepository.findOne(id);

        if(!user) {
            logger.error(`User: ${user.name} isn't already exists`);
            throw new Error('User is not already exists');
        }
        return user;
    }
}

export { FindUserService}