import { User } from '../../Class/User';
import { Role } from '../../Class/Role';


var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

module.exports = function (req: any, res: any) {
    const password = bcrypt.hashSync(req.body.password, 8);
    var user  = new User(
        req.body.name, 
        req.body.email, 
        password
    );
    var check = user.checkValues();
    if(check.valid == false) {
        res.status(400).json(check);
    } else {
        user.save((err: string) => {
            if (err) {
                res.status(500).json({
                    valid: false,
                    message: "An error occurred"
                })
                throw err;
            }
    
            if (req.body.roles) {
                Role.toMongooseSchema().find({
                        name: { $in: req.body.roles }
                    },
                    (err:any, roles:any) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
    
                        user.roles = roles.map((role:any) => role._id);
                        user.save((err:any) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            res.status(200).json({
                                valid: true,
                                message : "User added!"
                            })                        
                        });
                    }
                );
            } else {
                Role.toMongooseModel().findOne({ name: "user" }, (err:any, role:any) => {
                    console.log(role)
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
    
                    user.roles = [role._id];
                    user.save((err:any) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
    
                        res.status(200).json({
                            valid: true,
                            message : "User added!"
                        })                    
                    });
                });
            }
        });
    }
}