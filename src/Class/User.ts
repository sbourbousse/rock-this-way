const mongoose = require('mongoose')
const Schema = mongoose.Schema
import { checkFields } from "../functions/utils"
import { Role } from './Role';

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    verified: Boolean,
    game: [{}],
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
})

const userModel = mongoose.model("User", userSchema);

export class User {
    name: string;
    email: string;
    password: string;
    verified: boolean;
    gameSave: Object;
    roles: Role[] = [];

    constructor(_name: string, _email: string, _password: string, _verified: boolean = false) {
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.verified = _verified;
        this.gameSave = {};
    }

    setGameSave(gameSave: Object) {
        this.gameSave = gameSave;
    }

    toObject() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            verified: this.verified,
            game: this.gameSave,
            roles: this.roles
        }
    }

    static toMongooseSchema() {
        
        return userSchema;
    }

    static toMongooseModel(): any {
        return userModel;
    }

    save(cb: any) {
        const someUser = userModel;

        const newUser = someUser(
            this.toObject()
        );

        newUser.save(cb());
    }


    checkValues() {
        return checkFields(
            [this.name, this.email, this.password]
        );
    }
}