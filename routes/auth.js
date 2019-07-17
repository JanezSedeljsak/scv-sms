const express = require('express');

const router = express.Router();

// GET /feed/posts
router.post('/students', (req, res, next) => {
    res.status(200).json({
        students: [{ name: 'Janez', surname: 'Kekec' },
            { name: 'Luka', surname: 'Neki' },
            { name: 'Pajdo', surname: 'Pajdo' }]
    });
});