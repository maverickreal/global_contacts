import { DataTypes, Model, Optional } from "sequelize";
import { connection } from "../../connection/connection";

interface contactType {
    id: string,
    firstName: string,
    lastName?: string,
    phoneNumber: string,
    userId: string
};

export interface ContactDto extends Optional<contactType, 'id' | 'userId'> { };

export class Contact extends Model<contactType, ContactDto> {
    declare id: string;
    declare firstName: string;
    declare lastName?: string;
    declare phoneNumber: string;
    declare userId: string
};

Contact.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true },
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.TEXT,
        validate: { notEmpty: true },
        field: 'last_name'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isNumeric: true },
        field: 'phone_number'
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        /*references: {
            model: 'user',
            key: 'id'
        }*/
    }
}, { sequelize: connection, tableName: 'contacts', timestamps: false })