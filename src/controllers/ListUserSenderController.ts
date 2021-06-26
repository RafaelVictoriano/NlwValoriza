import {Request, Response} from "express";
import {ListUserSenderComplimentsService} from "../services/ListUserSenderComplimentsService";

class ListUserSenderController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const userSenderComplimentsService = new ListUserSenderComplimentsService();

        const compliments = await userSenderComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserSenderController }