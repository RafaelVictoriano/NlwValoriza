import {getCustomRepository} from "typeorm";
import {ComplimentsRepository} from "../repositories/ComplimentsRepository";
import {UsersRepositories} from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id,
    user_sender,
    user_receiver,
    message
}
class CreateComplimentsService {
    async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);
        const usersRepository = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver ) {
            throw new Error("User cannot be the equals")
        }

        const userReceiverExists = await usersRepository.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User receiver not found ")
        }

        const compliments = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentsRepository.save(compliments);

        return compliments;

    }
}

export { CreateComplimentsService}