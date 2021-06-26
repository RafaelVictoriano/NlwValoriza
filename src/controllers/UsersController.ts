import {ListUserService} from "../services/ListUserService";
import {Request, Response, response} from "express";

class UsersController {
    async handle(request: Request, response: Response) {
        const userService = new ListUserService();

        const users = await userService.execute();

        return response.json(users)
    }
}

export  { UsersController }