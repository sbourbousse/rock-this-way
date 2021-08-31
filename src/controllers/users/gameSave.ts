import { User } from '../../Class/User';

module.exports = async function (req: any, res: any) {
    let gameSave = req.body;
    let userFound = await User.toMongooseModel().findOneAndUpdate({
        _id: req.params.id
    }, { $push: { game: gameSave } });
    if (userFound == null) {
        console.log("user not found");
        res.status(404).json({
            valid: false,
            message : "User not found!"
        })   
        return;
    } else {
        res.status(200).json({
            valid: true,
            message : "Game saved successfuly"
        })
    }
}


// async function findUser(id: string) {
//     let userFound = await User.toMongooseModel().findOne({
//         _id
//     })
// }

