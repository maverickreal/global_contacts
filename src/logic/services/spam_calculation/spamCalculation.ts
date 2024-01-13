import { Op, col, fn, where } from "sequelize";
import { Contact } from "../../../data/models/contact/contact";
import { Spam } from "../../../data/models/spam/spam";
import { getSpamRating } from "../../utils";

interface mergeCountsMapItem {
    spam_count: number; save_count: number;
}

const getSpams = (phoneNumbers: string[]) => Spam.findAll({
    group: col('phone_number'),
    having: where(col('phone_number'), { [Op.in]: phoneNumbers }),
    attributes: ['phone_number', [fn('COUNT', 0), 'spam_count']]
});


const getContactSaveCounts = (phoneNumbers: string[]) => Contact.findAll({
    group: col('phone_number'),
    having: where(col('phone_number'), { [Op.in]: phoneNumbers }),
    attributes: ['phone_number', [fn('COUNT', 0), 'save_count']]
});

export const spamCalculations = async (contacts: Contact[]): Promise<[Contact, string][]> => {
    const phoneNumbers: string[] = contacts.map(
        (contact: any) => contact.dataValues['phone_number']
    );
    const spams: any[] = await getSpams(phoneNumbers);
    const contactSaveCounts: any[] = await getContactSaveCounts(phoneNumbers);

    const map: Record<string, mergeCountsMapItem> = {};

    for (let spam of spams) {
        if (map[spam.dataValues.phone_number]) {
            map[spam.dataValues.phone_number].spam_count += spam.dataValues.spam_count;
        } else {
            map[spam.dataValues.phone_number] = { spam_count: spam.dataValues.spam_count, save_count: 0 };
        }
    }

    for (let contactSaveCount of contactSaveCounts) {
        if (map[contactSaveCount.dataValues.phone_number]) {
            map[contactSaveCount.dataValues.phone_number].save_count += contactSaveCount.dataValues.save_count;
        } else {
            map[contactSaveCount.dataValues.phone_number] = { spam_count: 0, save_count: contactSaveCount.dataValues.save_count };
        }
    }
    return contacts.map((contact: any) => {
        const rating: string = getSpamRating(map[contact.dataValues.phone_number].spam_count, map[contact.dataValues.phone_number].save_count);
        return [contact, rating];
    });
}