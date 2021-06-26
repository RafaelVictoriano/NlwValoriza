import {getCustomRepository} from "typeorm";
import {ComplimentsRepository} from "../repositories/ComplimentsRepository";

class ListUserSenderComplimentsService {
    async execute( user_id: string) {
        const repository = getCustomRepository(ComplimentsRepository);

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