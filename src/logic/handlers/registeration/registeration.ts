import { Request, Response } from "express";
import { User, UserDto } from "../../../data/models/user/User";

export const handleSignup = async (req: Request, res: Response) => {
    try {
        const fields: UserDto = req.body;
        const userExists = await User.findOne({ where: { phoneNumber: fields.phoneNumber } });
        if (userExists) {
            return res.status(400).send({
                message: "User already exists"
            });
        }
        await User.create(fields);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send('One of the required fields is missing.');
    }
};