const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
};

module.exports = ensureAuthenticated;
