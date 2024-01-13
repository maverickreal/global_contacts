import { DataTypes, Model, Optional } from "sequelize";
import { connection } from "../../connection/connection";

interface spamType {
    id: string;
    phoneNumber: string;
    spamCount: number;
};

export interface SpamDto extends Optional<spamType, 'id'> { };

export class Spam extends Model<spamType, SpamDto> {
    declare id: string;
    declare phoneNumber: string;
    declare spamCount: number;
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
        unique: true,
        allowNull: false,
        validate: { isNumeric: true },
        field: 'phone_number'
    },
    spamCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'spam_count'
    }
}, { sequelize: connection, tableName: 'spams', timestamps: false });