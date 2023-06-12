const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.verify = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {

        const token = authHeader.substring(7);
        console.log(token);
        const tt = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
        console.log(tt);
        const user = User.findById(tt.userId);
        if (user) {
            var expiredate = new Date(tt.exp * 1000);
            if (new Date < expiredate) {
                res.status(200).json({ message: 'authorized' })
            }
            else{
                res.status(401).json({ message: 'unauthorized' })
            }
            
        }
        else {
            res.status(401).json({ message: 'unauthorized' })
        }
    }
    else {
        res.status(401).json({ message: 'unauthorized' });
    }
}
