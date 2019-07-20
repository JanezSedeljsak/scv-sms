const express = require('express');
const router = express.Router();

const mongoClient = require('./mongodbConnModule');
var db = mongoClient._connect();

const {
    Student, Teacher, School, SClass,
    Year, Competition, Achivment, AchivmentLevel,
    AchivmentStudent, CompetitionStudent, ClassSubject,
    Subject, AchivmentType, Grade, ClassStudentYear,
    CompetitionSubject, ClassCompetition
} = require('./../models/schemas');

router.get('/students', (req, res, next) => {
    Student.find({}, '-_id name surname easistentId', function (error, students) {
        if (error) console.error(error);
        res.status(200).json({ students });
    }).sort({ _id: -1 });
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


router.get('/competitions', (req, res, next) => {
    res.status(200).json({
        competitions: [
            { name: 'mat tekmovanje', date: new Date() },
            { name: 'kenguru', date: new Date() },
            { name: 'rtk programiranje', date: new Date() },
            { name: 'malta2019', date: new Date() }
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