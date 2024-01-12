import { DataTypes, Model, Optional } from 'sequelize';
import { connection } from '../../connection/connection';

interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string;
    password: string;
};

export interface UserDto extends Optional<UserType, 'id'> { };

export class User extends Model<UserType, UserDto> {
    declare id: string;
    declare firstName: string;
    declare lastName: string;
    declare email?: string;
    declare phoneNumber: string;
    declare password: string;
};

User.init({
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
        allowNull: false,
        validate: { notEmpty: true },
        field: 'last_name'
    },
    email: {
        type: DataTypes.TEXT,
        unique: true,
        validate: { isEmail: true }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isNumeric: true },
        field: 'phone_number'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    }
}, { sequelize: connection, tableName: 'users', timestamps: false });