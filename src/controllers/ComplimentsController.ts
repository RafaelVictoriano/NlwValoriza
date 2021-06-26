import {Request, Response} from "express";
import {CreateComplimentsService} from "../services/CreateComplimentsService";

class CreateComplimentsController {
    async handle(request: Request, response: Response) {
        const {tag_id, user_receiver, message} = request.body;
        const { user_id } = request;
        const complimentsService = new CreateComplimentsService();

        const compliment = await complimentsService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message});

        return response.json(compliment);
    }
}

export { CreateComplimentsController }