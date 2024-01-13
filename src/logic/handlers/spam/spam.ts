import { Request, Response } from "express";
import { Spam } from "../../../data/models/spam/spam";

export const handleMarkSpam = async (req: Request, res: Response) => {
    try {
        const phoneNumber = req.query.phoneNumber as string;
        const userId: string = req.body.user;
        const [spam, created] = await Spam.findOrCreate({
            where: { phoneNumber, userId }
        });
        if (created) {
            res.status(200).send();
        } else {
            res.status(400).send({ error: 'You have already marked this user as spam' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error.');
    }
}