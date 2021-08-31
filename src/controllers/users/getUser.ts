import { User } from '../../Class/User';

module.exports = async function (req: any, res: any) {

    if (req.params.id == undefined || req.params.id == null ||  req.params.id == "") {
        res.status(405).json({
            valid: true,
            message : "Enter a valid user id"
        });
    }
    const userFound = await User.toMongooseModel().findOne({
        _id : req.params.id
    });

    if(userFound == null) {
        res.status(404).json({
            valid: true,
            message : "User not found!"
        });
    } else {
        res.status(200).json({
            valid: true,
            user : userFound
        });
    }             
}