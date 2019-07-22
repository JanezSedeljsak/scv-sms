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
    Student.find({}, 'name surname easistentId', function (error, students) {
        if (error) console.error(error);
        res.status(200).json({ students });
    }).sort({ _id: -1 });
});

router.get('/teachers', (req, res, next) => {
    Teacher.find({}, 'name surname email', function (error, teachers) {
        if (error) console.error(error);
        res.status(200).json({ teachers });
    }).sort({ _id: -1 });
});

router.get('/types', (req, res, next) => {
    AchivmentType.find({}, 'name points', function (error, types) {
        if (error) console.error(error);
        res.status(200).json({ types });
    }).sort({ _id: -1 });
});

router.get('/levels', (req, res, next) => {
    AchivmentLevel.find({}, 'name points', function (error, levels) {
        if (error) console.error(error);
        res.status(200).json({ levels });
    }).sort({ _id: -1 });
});

//this should be moved to another file but for now its here
//////
router.post('/add-type', (req, res, next) => {
    let newType = new AchivmentType({
        name: req.body.name,
        points: req.body.points
    });
    newType.save(error => error ? console.log(error) : res.send({ succes: true }))
});

router.get('/add-level', (req, res, next) => {
    let newLevel = new AchivmentLevel({
        name: req.body.name,
        points: req.body.points
    });
    newLevel.save(error => error ? console.log(error) : res.send({ succes: true }))

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