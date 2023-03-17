import { BandBusiness } from './../business/BandBusiness';
import { BandInputDTO } from './../model/Band';
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signupBand(req: Request, res: Response) {
        try {

            const input: BandInputDTO = {
                name: req.body.name,
                gender: req.body.gender,
                responsible: req.body.responsible
            }

            const userBusiness = new BandBusiness();
            const token = await userBusiness.createBand(input);

            res.status(200).send({message:"Banda criada com sucesso!"});

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}