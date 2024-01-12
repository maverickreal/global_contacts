import { connection } from "./connection/connection";
import { Contact } from "./models/contact/contact";
import { User } from "./models/user/User";
import './models/spam/spam';

User.hasMany(Contact);
Contact.belongsTo(User);

connection.sync({ force: true }); // ??? try alter maybe