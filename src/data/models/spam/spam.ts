import { DataTypes, Model, Optional } from "sequelize";
import { connection } from "../../connection/connection";
import { phoneNumberCheck } from "../../../logic/utils";

interface spamType {
    id: string;
    phoneNumber: string;
    userId: string;
};

export interface SpamDto extends Optional<spamType, 'id' | 'userId'> { };

export class Spam extends Model<spamType, SpamDto> {
    declare id: string;
    declare phoneNumber: string;
    declare userId: string;
};

Spam.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isNumeric: true, phoneNumberCheck },
        field: 'phone_number'
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'UserId'
    }

}, { sequelize: connection, tableName: 'spams', timestamps: false });