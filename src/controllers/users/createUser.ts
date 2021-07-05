import { User } from '../../Class/User';
import { Role } from '../../Class/Role';
const nodemailer = require("nodemailer");


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
        user.save(async (err: string) => {
            if (err) {
                res.status(500).json({
                    valid: false,
                    message: "An error occurred"
                })
                throw err;
            }
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'jadon.nicolas18@ethereal.email',
                    pass: 'TfSNHMer6w3txnhpnA'
                }
            });
            let info = await transporter.sendMail({
                from: '"Rock this way" <contact@rockthisway.com>', // sender address
                to: user.email, // list of receivers
                subject: "Bienvenue a Rock This Way ! ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
              });
            
              console.log("Message sent: %s", info.messageId);
              
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
             

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