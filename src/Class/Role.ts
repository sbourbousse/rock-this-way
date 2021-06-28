const mongoose = require('mongoose')
const Schema = mongoose.Schema
import { checkFields } from "../functions/utils"

export class Role {
    name: string;
    

    constructor(_name: string) {
        this.name = _name;
    }

    toObject() {
        return {
            name: this.name,
        }
    }

    static toMongooseSchema() {
        const roleSchema = Schema({
            name: String

        })
        return roleSchema;
    }

    static toMongooseModel(): any {
        return mongoose.model("Role", Role.toMongooseSchema())
    }

    save(cb: any) {
        const someRole = Role.toMongooseModel();

        const newRole = someRole(
            this.toObject()
        );

        newRole.save(cb());
    }

    checkValues() {
        return checkFields(
            [this.name]
        );
    }
}