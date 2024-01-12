import { verify, sign } from 'jsonwebtoken';
import { User, UserDto } from '../../../data/models/user/User';

const uidToJwt: Record<string, string> = {}, secret = process.env.JWT_SECRET_KEY as string, expiresIn = process.env.JWT_SECRET_KEY_EXPIRES_IN as string;

export const assignToken = (user: User) => {
    const token = sign(user.toJSON(), secret, { expiresIn });
    uidToJwt[user.id] = token;
    return token;
}

export const invalidate = (userId: string) => delete uidToJwt[userId];

export const auth = (token: string) => { // ???
    const user = verify(token, secret) as UserDto;
    const realToken = uidToJwt[user.id!];
    return (realToken === token ? user : null);
};