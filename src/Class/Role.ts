const mongoose = require('mongoose')
const Schema = mongoose.Schema
import { checkFields } from "../functions/utils"

const roleSchema = Schema({
    name: String
})

const roleModel = mongoose.model("Role", roleSchema)



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
       
        return roleSchema;
    }

    static toMongooseModel(): any {
        return roleModel;
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