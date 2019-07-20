const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = mongoose.model("Student", new Schema({
    name: { type: String, unique: false },
    surname: { type: String, unique: false },
    easistentId: { type: Number, unique: true }
}));

let School = mongoose.model("School", new Schema({
    shortName: { type: String, unique: true },
    longName: { type: String, unique: true }
}));

let SClass = mongoose.model("SClass", new Schema({
    name: { type: String, unique: true },
}));

let Teacher = mongoose.model("Teacher", new Schema({
    name: { type: String, unique: false },
    surname: { type: String, unique: false },
    email: { type: String, unique: true },
    password: { type: String, unique: false }
}));

let Year = mongoose.model("Year", new Schema({
    name: { type: String, unique: true }
}));

let Subject = mongoose.model("Subject", new Schema({
    shortName: { type: String, unique: true },
    longName: { type: String, unique: true },
}));

let ClassStudentYear = mongoose.model("ClassStudentYear", new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', unique: false },
    year: { type: Schema.Types.ObjectId, ref: 'Year', unique: false },
    class: { type: Schema.Types.ObjectId, ref: 'SClass', unique: false },
    confirmedGrades: { type: Boolean, default: false, unique: false }
}));

let Competition = mongoose.model("Competition", new Schema({
    name: { type: String, unique: true },
    insertDate: { type: Date, default: Date.now, unique: false },
    maxEntry: { type: Number, unique: false },
    deadline: { type: Date, unique: false },
    decription: { type: String, required: false, unique: false },
    achivmentsWeight: { type: mongoose.Decimal128, default: 0.00, unique: false },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', unique: false }
}));

let AchivmentLevel = mongoose.model("AchivmentLevel", new Schema({
    name: { type: String, unique: true, unique: true },
    points: { type: mongoose.Decimal128, deafult: 1.00, unique: false },
}));

let AchivmentType = mongoose.model("AchivmentType", new Schema({
    name: { type: String, unique: true, unique: true },
    points: { type: mongoose.Decimal128, deafult: 1.00, unique: false },
}));

let CompetitionSubject = mongoose.model("CompetitionSubject", new Schema({
    subjectWeight: { type: Schema.Types.Decimal128, default: 0.00, unique: false },
    competition: { type: Schema.Types.ObjectId, ref: 'Competition', unique: false },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', unique: false },
    year: { type: Schema.Types.ObjectId, ref: 'Year', unique: false },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', unique: false }
}));

let ClassCompetition = mongoose.model("ClassCompetition", new Schema({
    competition: { type: Schema.Types.ObjectId, ref: 'Competition', unique: false },
    class: { type: Schema.Types.ObjectId, ref: 'SClass', unique: false }
}));

let Achivment = mongoose.model("Achivment", new Schema({
    name: { type: String, unique: false },
    date: { type: Date, default: Date.now, unique: false },
    description: { type: String, unique: false },
    place: { type: Number, unique: false },
    level: { type: Schema.Types.ObjectId, ref: 'AchivmentLevel', unique: false },
    type: { type: Schema.Types.ObjectId, ref: 'AchivmentType', unique: false },
    schoolYear: { type: Schema.Types.ObjectId, ref: 'Year', unique: false },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', unique: false }
}));

let Grade = mongoose.model("Grade", new Schema({
    value: { type: Number, unique: false },
    date: { type: Date, default: Date.now, unique: false },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', unique: false },
    classStudentYear: { type: Schema.Types.ObjectId, ref: 'ClassStudentYear', unique: false }
}));

let AchivmentStudent = mongoose.model("AchivmentStudent", new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', unique: false },
    achivment: { type: Schema.Types.ObjectId, ref: 'Achivment', unique: false }
}));

let ClassSubject = mongoose.model("ClassSubject", new Schema({
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', unique: false },
    class: { type: Schema.Types.ObjectId, ref: 'SClass', unique: false },
}));

let CompetitionStudent = mongoose.model("CompetitionStudent", new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'ClassStudentYear', unique: false },
    competition: { type: String, required: true, ref: 'Competition', unique: false },
    date: { type: Date, default: Date.now, unique: false }
}));

module.exports = {
    Student, Teacher, School, SClass,
    Year, Competition, Achivment, AchivmentLevel,
    AchivmentStudent, CompetitionStudent, ClassSubject,
    Subject, AchivmentType, Grade, ClassStudentYear,
    CompetitionSubject, ClassCompetition
};