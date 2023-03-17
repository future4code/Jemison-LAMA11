import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const login: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.loginUser(login);

            res.status(200).send({token});
            
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        
        await BaseDatabase.destroyConnection();
    }
}