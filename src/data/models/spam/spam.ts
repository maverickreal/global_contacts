import { DataTypes, Model, Optional } from "sequelize";
import { connection } from "../../connection/connection";

interface spamType {
    id: string;
    phoneNumber: string;
    spamCount: bigint;
};

export interface SpamDto extends Optional<spamType, 'id'> { };

export class Spam extends Model<spamType, SpamDto> { };

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
        type: DataTypes.BIGINT,
        defaultValue: 0,
        field: 'spam_count'
    }
}, { sequelize: connection, tableName: 'spam' });