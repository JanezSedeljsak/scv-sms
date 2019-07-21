const mongoClient = require('./../routes/mongodbConnModule');
var db = mongoClient._connect();

const {
    Student, Teacher, School, SClass,
    Year, Competition, Achivment, AchivmentLevel,
    AchivmentStudent, CompetitionStudent, ClassSubject,
    Subject, AchivmentType, Grade, ClassStudentYear,
    CompetitionSubject, ClassCompetition
} = require('./../models/schemas');

/* be cearful running this script will make changes to the database
 that might not be revertible */


var schools = [
    { _id: "5d3433e9609cd6d248bea2d4", shortName: 'ERŠ', longName: "Elektro in računalniška šola" },
    { _id: '5d3433ea609cd6d248bea2d9', shortName: 'ŠSGO', longName: "Šola za strojništvo, geotehniko in okolje" },
    { _id: '5d3433ea609cd6d248bea2da', shortName: 'ŠSD', longName: "Šola za storitvene dejavnosti" },
    { _id: '5d3433ea609cd6d248bea2db', shortName: 'GIM', longName: "Gimnazija" }
];

schools.forEach(item => {
    School.findOneAndUpdate(item, item, { upsert: true }, function (err, doc) {
        console.log(doc);
    });
});

var classes = [
    { school: '5d3433e9609cd6d248bea2d4', name: '1.EL'},
    { school: '5d3433e9609cd6d248bea2d4', name: '1.ET'},
    { school: '5d3433e9609cd6d248bea2d4', name: '1.PTI'},
    { school: '5d3433e9609cd6d248bea2d4', name: '1.TM'},
    { school: '5d3433e9609cd6d248bea2d4', name: '1.TRA'},
    { school: '5d3433e9609cd6d248bea2d4', name: '1.TRB'},
    { school: '5d3433e9609cd6d248bea2d4', name: '2.EL'},
    { school: '5d3433e9609cd6d248bea2d4', name: '2.ET'},
    { school: '5d3433e9609cd6d248bea2d4', name: '2.PTI'},
    { school: '5d3433e9609cd6d248bea2d4', name: '2.TM'},
    { school: '5d3433e9609cd6d248bea2d4', name: '2.TRA'},
    { school: '5d3433e9609cd6d248bea2d4', name: '2.TRB'},
    { school: '5d3433e9609cd6d248bea2d4', name: '3.EL'},
    { school: '5d3433e9609cd6d248bea2d4', name: '3.ET'},
    { school: '5d3433e9609cd6d248bea2d4', name: '3.TM'},
    { school: '5d3433e9609cd6d248bea2d4',  name: '3.TRA'},
    { school: '5d3433e9609cd6d248bea2d4',  name: '3.TRB'},
    { school: '5d3433e9609cd6d248bea2d4',  name: '4.ET'},
    { school: '5d3433e9609cd6d248bea2d4',  name: '4.TM'},
    { school: '5d3433e9609cd6d248bea2d4',  name: '4.TRA'},
    { school: '5d3433e9609cd6d248bea2d4',  name: '4.TRB'}
];

schools.forEach(item => {
    SClass.findOneAndUpdate(item, item, { upsert: true }, function (err, doc) {
        console.log(doc);
    });
});