const mongoose = require('mongoose')
const Schema = mongoose.Schema
import { checkFields } from "../functions/utils"

export class User {
    name: string;
    email: string;
    password: string;
    verified: boolean;

    constructor(_name: string, _email: string, _password: string, _verified: boolean = false) {
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.verified = _verified;
    }

    toObject() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            verified: this.verified,
            game: {}
        }
    }

    toMongooseSchema() {
        const userSchema = Schema({
            name: String,
            email: String,
            password: String,
            verified: Boolean,
            game: [{}]
        })
        return userSchema;
    }

    toMongooseModel(): any {
        return mongoose.model("User", this.toMongooseSchema())
    }

    save(cb: any) {
        const User = this.toMongooseModel();

        const newUser = User(
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