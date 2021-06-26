import {ListUserService} from "../services/ListUserService";
import {Request, Response, response} from "express";
import {FindUserService} from "../services/FindUserService";

class UserController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;
        const userService = new FindUserService();

        const user = await userService.execute(id);

        return response.json(user)
    }
}


export  { UserController }