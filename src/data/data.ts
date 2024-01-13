import { connection } from "./connection/connection";
import { Contact } from "./models/contact/contact";
import { Spam } from "./models/spam/spam";
import { User } from "./models/user/User";

User.hasMany(Contact);
Contact.belongsTo(User);

User.hasMany(Spam);
Spam.belongsTo(User);

connection.sync({ alter: true });