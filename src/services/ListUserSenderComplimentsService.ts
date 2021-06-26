import {getCustomRepository} from "typeorm";
import {ComplimentsRepository} from "../repositories/ComplimentsRepository";
import {logger} from "../logger";

class ListUserSenderComplimentsService {
    async execute( user_id: string) {
        const repository = getCustomRepository(ComplimentsRepository);

        logger.info(`Seeking out compliments of :${user_id}`);
       const compliments = await repository.find({
            where: {
                user_sender: user_id
            },
             relations: ["userSender", "userReceiver", "tag"]
        });

        return compliments;
    }
}

export { ListUserSenderComplimentsService }