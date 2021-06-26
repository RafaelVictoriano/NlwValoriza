import {getCustomRepository} from "typeorm";
import {UsersRepositories} from "../repositories/UsersRepositories";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticationService {

    async execute({email, password}: IAuthenticateRequest): Promise<string> {
        const userRepositories = getCustomRepository(UsersRepositories);

        const user = await userRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email or password incorrect");
        }

        const passwordCorrect = await compare(password, user.password);

        if (!passwordCorrect) {
            throw new Error("Email or password incorrect");
        }

        //Gerando do token
        const token = sign({
                email: user.email
            },
            "dc82075bd441604e5ac68bba3f78f5149be1a95d", {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;

    }
}

export {AuthenticationService}