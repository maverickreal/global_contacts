import { Op, col, fn, where } from "sequelize";
import { Contact } from "../../../data/models/contact/contact";
import { Spam } from "../../../data/models/spam/spam";
import { getSpamRating } from "../../utils";

interface mergeCountsMapItem {
    spamCount: number; save_count: number;
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
        if (map[spam.phoneNumber]) {
            map[spam.phoneNumber].spamCount += spam.spamCount;
        } else {
            map[spam.phoneNumber] = { spamCount: spam.spamCount, save_count: 0 };
        }
    }

    for (let contactSaveCount of contactSaveCounts) {
        if (map[contactSaveCount.phoneNumber]) {
            map[contactSaveCount.phoneNumber].save_count += contactSaveCount.saveCount;
        } else {
            map[contactSaveCount.phoneNumber] = { spamCount: 0, save_count: contactSaveCount.save_count };
        }
    }

    return contacts.map((contact: Contact) => {
        const rating: string = getSpamRating(map[contact.phoneNumber].spamCount || 0, map[contact.phoneNumber].save_count || 0);
        return [contact, rating];
    });
}