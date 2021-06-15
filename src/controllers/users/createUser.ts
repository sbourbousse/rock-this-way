import { User } from '../../Class/User';

module.exports = function (req: any, res: any) {
    console.log(req)
    var user  = new User(
        req.body.name, 
        req.body.email, 
        req.body.password
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
            } else {
                res.status(200).json({
                    valid: true,
                    message : "User added!"
                })
            }
        })
    }
}