const express = require('express');

const router = express.Router();

// GET /feed/posts
router.get('/students', (req, res, next) => {
    res.status(200).json({
        students: [
            { name: 'Janez', surname: 'Kekec' },
            { name: 'Pajdo', surname: 'Pajdo' },
            { name: 'Luka', surname: 'Neki' },
            { name: 'Mojstr', surname: 'Jaka' }
        ]
    });
});

router.get('/subjects', (req, res, next) => {
    res.status(200).json({
        subjects: [
            { short: 'mat', long: 'Matematika' },
            { short: 'slo', long: 'Slovenščina' },
            { short: 'ang', long: 'Angleščina' },
            { short: 'mat', long: 'Matematika' },
            { short: 'slo', long: 'Slovenščina' },
            { short: 'ang', long: 'Angleščina' }
        ]
    });
});

router.get('/user', (req, res, next) => {
    if (req.session.id) {
        res.status(200).json({
            user: req.session.id
        });
    } else {
        req.session.id = null
    }
});

router.get('/classes', (req, res, next) => {
    res.status(200).json({
        classes: [
            { name: '1.tra' },
            { name: '2.tra' },
            { name: '3.tra' },
            { name: '4.tra' },
            { name: '1.trb' },
            { name: '2.trb' }
        ]
    });
});

router.get('/competitions', (req, res, next) => {
    res.status(200).json({
        competitions: [{ name: 'Janez', surname: 'Kekec' },
            { name: 'Luka', surname: 'Neki' },
            { name: 'Pajdo', surname: 'Pajdo' }]
    });
});

router.get('/achivments', (req, res, next) => {
    res.status(200).json({
        achivments: [{ name: 'Janez', surname: 'Kekec' },
            { name: 'Luka', surname: 'Neki' },
            { name: 'Pajdo', surname: 'Pajdo' }]
    });
});

module.exports = router;