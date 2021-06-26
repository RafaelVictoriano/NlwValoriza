import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";

interface IPayLoad{
    sub: string
}

export function ensurmAuthencated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const {sub} = verify(token, "dc82075bd441604e5ac68bba3f78f5149be1a95d") as IPayLoad;
        request.user_id = sub;
        return next();

    } catch (err) {
        return response.status(401).end();
    }


}