const ensureAuthenticated = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log("req.cookies", req.cookies);
    res.status(200).json({ message: 'Success' });
});

module.exports = router;
