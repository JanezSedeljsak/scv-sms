const express = require('express');

const router = express.Router();

// GET /feed/posts
router.get('/students', (req, res, next) => {
    res.status(200).json({
        students: [{ name: 'Janez', surname: 'Kekec' },
            { name: 'Luka', surname: 'Neki' },
            { name: 'Pajdo', surname: 'Pajdo' }]
    });
});

router.get('/classes', (req, res, next) => {
    res.status(200).json({
        classes: [{ short: 'mat', long: 'Matematika' },
            { short: 'slo', long: 'Slovenščina' },
            { short: 'ang', long: 'Angleščina' }]
    });
});


router.get('/user', (req, res, next) => {
    res.status(200).json({
        user: true
    });
});

module.exports = router;