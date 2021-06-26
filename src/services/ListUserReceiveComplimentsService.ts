import {getCustomRepository} from "typeorm";
import {ComplimentsRepository} from "../repositories/ComplimentsRepository";
import {logger} from "../logger";

class ListUserReceiveComplimentsService {
    async execute( user_id: string) {
        const repository = getCustomRepository(ComplimentsRepository);

        logger.info(`Seeking out user:${user_id}`);
        const compliments = await repository.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });

        return compliments;
    }
}

export { ListUserReceiveComplimentsService }