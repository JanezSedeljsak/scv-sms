const express = require('express');
const crypto = require('crypto');
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

const hash = pass => {
    return crypto.createHash('md5').update(`${pass}SCV541T$$`).digest('hex');
}

router.post('/create-admin', (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            msg: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else if (req.body.pass !== req.body.pass1) {
        res.status(200).json({
            ok: false,
            msg: 'Gesli se ne ujemata'
        });
    } else {
        let newAdmin = new Teacher({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.mail,
            password: hash(req.body.pass).toString()
        });
        newAdmin.save(error => {
            if(error) {
                res.status(200).json({
                    ok: false,
                    msg: 'Pojavila se je napaka pri vnosu administratorja; Verjetno učitelj že obstaja!'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    msg: 'Uspešno smo dodali novega učitelja!'
                });
            }
        });         
    }
});


module.exports = router;