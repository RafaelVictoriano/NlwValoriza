import {Request, Response} from "express";
import {ListUserReceiveComplimentsService} from "../services/ListUserReceiveComplimentsService";

class ListUserReceiveController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const userReceiveComplimentsService = new ListUserReceiveComplimentsService();

        const compliments = await userReceiveComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserReceiveController }