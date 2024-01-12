import { Request, Response } from "express";
import { User, UserDto } from "../../../data/models/user/User";
import { assignToken, invalidate } from "../../services/authentication/authentication";
import { Op } from "sequelize";

export const handleSignup = async (req: Request, res: Response) => {
    try {
        const fields: UserDto = req.body;
        const userExists: User | null = await User.findOne({ where: { phoneNumber: fields.phoneNumber } });
        if (userExists) {
            return res.status(400).send({
                message: "User already exists"
            });
        }
        const user = await User.create(fields);
        const token: string = assignToken(user);
        res.status(200).send({ token });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'One of the required fields is missing.' });
    }
};

export const handleSignin = async (req: Request, res: Response) => {
    try {
        const fields: UserDto = req.body;
        const orItems: any = [];
        if (fields.email) orItems.push({ email: fields.email });
        if (fields.phoneNumber) orItems.push({ phoneNumber: fields.phoneNumber });
        const userExists: User | null = await User.findOne({
            where: {
                [Op.or]: orItems,
                password: fields.password
            }
        });
        if (!userExists) throw new Error();
        const token: string = assignToken(userExists);
        res.status(200).send({ token });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Incorrect credentials provided with.' });
    }
};

export const handleSignout = (req: Request, res: Response) => {
    try {
        console.log('Invalidating', req.body.user);
        invalidate(req.body.user.id);
        res.status(200).send({ message: 'Successfully signed out.' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Something went wrong.' });
    }
}