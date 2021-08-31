import { User } from '../../Class/User';

module.exports = function (req: any, res: any) {
    User.toMongooseModel().find({}, (err: any, users: any) => {
        users.sort((a : any, b : any) => {
            if(a.game[a.game.length - 1].globalScore == undefined) return 1;
            if(b.game[a.game.length - 1].globalScore == undefined) return 0;

            if (a.game[a.game.length - 1].globalScore < b.game[a.game.length - 1].globalScore)
                return 1;
            if (a.game[a.game.length - 1].globalScore > b.game[a.game.length - 1].globalScore)
                return -1;
            else
                return 0;
        })
        if(users.length > 10)
        users.slice(9)
        res.status(200).json(users.map( (user:any) => {
                return {
                    name: user.name,
                    score : user.game[user.game.length - 1].globalScore == undefined ? 0 : user.game[user.game.length - 1].globalScore
                }
            }
        ));    
    });

}
