import { Request, Response } from "express";
import { User, UserDto } from "../../../data/models/user/User";
import { Contact, ContactDto } from "../../../data/models/contact/contact";
import { Op, col, fn, literal } from "sequelize";
import { spamCalculations } from "../../services/spam_calculation/spamCalculation";

interface InterResult {
    status: number;
    body: any;
};

export const handleCreateContact = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        const userId = req.body.user.id;

        if (!firstName || !lastName || !phoneNumber)
            return res.status(400).send({ error: 'Missing required fields.' });

        const [contact, created] = await Contact.findOrBuild({
            where: {
                [Op.and]: [
                    { userId }, {
                        [Op.or]: [{ phoneNumber }, {
                            [Op.and]: [
                                { firstName }, { lastName }
                            ]
                        }]
                    }
                ]
            }
        });
        if (!created) return res.status(400).send({ error: 'Contact already exists.' });
        contact.set({ firstName, lastName, phoneNumber, userId });
        await contact.save();
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Something went wrong.' });
    }
}

const searchContactByName = async (name: string): Promise<InterResult> => {
    let contacts: Contact[] = await Contact.findAll({
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: `%${name}%` } },
                { lastName: { [Op.like]: `%${name}%` } }]
        },
        order: [[literal(`first_name like '${name}%'`), 'DESC']],
        attributes: ['first_name', 'last_name', 'phone_number']
    });
    const body: [Contact, string][] = await spamCalculations(contacts);
    return { status: 200, body };
}

const searchContactByPhone = async (phoneNumber: string, thisUser: UserDto): Promise<InterResult> => {
    const thatUser: User | null = await User.findOne({ where: { phoneNumber } });
    if (thatUser) {
        const isThisUserThatUsersContact = await Contact.count({
            where: {
                userId: thatUser.id,
                phoneNumber: thisUser.phoneNumber
            }
        });
        return {
            status: 200, body: {
                name: `${thatUser.firstName} ${thatUser.lastName}`,
                phoneNumber: thatUser.phoneNumber,
                email: (isThisUserThatUsersContact ? thatUser.email : '')
            }
        };
    }
    const contacts: Contact[] = await Contact.findAll({
        where: { phoneNumber }, attributes: [
            [fn('concat', col('first_name'), ' ', col('last_name')), 'fullName']
        ]
    });
    const body: [Contact, string][] = await spamCalculations(contacts);
    return { status: 200, body };
}

export const handleSearchContact = async (req: Request, res: Response) => {
    try {
        const thisUser: UserDto = req.body.user;
        const { name, phoneNumber } = req.query;
        let interRes: InterResult = { status: 400, body: { error: 'Name or phone is required.' } };
        if (name) interRes = await searchContactByName(name.toString());
        else if (phoneNumber) interRes = await searchContactByPhone(phoneNumber.toString(), thisUser);
        res.status(interRes.status).send(interRes.body);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Something went wrong.' });
    }
}