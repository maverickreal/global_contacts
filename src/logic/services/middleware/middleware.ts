import { NextFunction, Request, Response } from "express";
import { auth } from "../authentication/authentication";
import { UserDto } from "../../../data/models/user/User";

export const tokenToUserAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        const user: UserDto | null = auth(token);
        if (!user) return res.status(401).send({ error: 'Unauthorized' });
        req.body.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
};