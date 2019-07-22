const express = require('express');
const CryptoJS = require('crypto-js');
const SHA256 = require("crypto-js/sha256")
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
    return SHA256(`${pass}SCV541T$$`);
}

const generateToken = userObj => {
    let token = CryptoJS.AES.encrypt(JSON.stringify(userObj), "5cv4pp0ortk3y");
    return token.toString(); 
}

const parseToken = token => {
    let userObj = JSON.parse(CryptoJS.AES.decrypt(token, "5cv4pp0ortk3y").toString(CryptoJS.enc.Utf8));
    return userObj;
}

router.post('/create-admin', (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else if (req.body.pass !== req.body.pass1) {
        res.status(200).json({
            ok: false,
            result: 'Gesli se ne ujemata'
        });
    } else {
        let newAdmin = new Teacher({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.mail,
            password: hash(req.body.pass).toString()
        });
        newAdmin.save(error => {
            if (error) {
                res.status(200).json({
                    ok: false,
                    result: 'Pojavila se je napaka pri vnosu administratorja; Verjetno učitelj že obstaja!'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    result: 'Uspešno smo dodali novega učitelja!'
                });
            }
        });
    }
});

router.post('/try-login', (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else {
        Teacher.findOne({ 
            email: req.body.mail,
            password: hash(req.body.pass).toString()
        }, async function (error, result) { 
            if (error) {
                res.status(200).json({
                    ok: false,
                    result: 'Pojavila se je napaka pri iskanju uporabnika!'
                });
            } else {
                if (!result) {
                    res.status(200).json({
                        ok: false,
                        result: "Uporabnik ni bil najden!"
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        result: await generateToken({_id: result._id})
                    });
                }
            } 
        });
    }
});


module.exports = router;