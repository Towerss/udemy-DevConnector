const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get the token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        return res.status(401).json({ message: 'No token, authorization denied.'});
    }

    // Verify token
    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));

        req.user = decode.user;
        console.log(req.user);

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token not valid.' });
    }
}