require('dotenv').config();
const jwt = require('jsonwebtoken');

// The Purpose of this Function is to get The Token that sent From any Front End 
function auth(request, response, next)
{
    // Note Important this the Header Value For Front-End
    const token = request.header('x-auth-token');
    // Check if The Token Exist Or Not
    if(!token)
        response.status(401).json({msg : "No Token, Authorized Denied"});
    // Verify The Token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.status(403).json({msg : "Token is Invalid"});
        request.user = user;
        next();
    });
}
module.exports = auth;