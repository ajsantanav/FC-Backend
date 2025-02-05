// import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'No Token, Auth Denied' }] });
    }
    try {
        const decode = jwt.verify(token, process.env.jwtSecret);

        req.user = decode.user;

        next();
    }
    catch (err) {
        res.status(401).json({ errors: [{ msg: 'Token is not Valid' }] });
    }
};