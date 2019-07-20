const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    name: { type: String, unique: false },
    surname: { type: String, unique: false },
    easistent_id: {type: Number, unique: true} 
});

let SchoolSchema = new Schema({
    short_name: { type: String, unique: true },
    long_name: { type: String, unique: true }
});

let ClassSchema = new Schema({
    name: { type: String, unique: true },
    _school_id: {type: Schema.Types.ObjectId, ref: 'School'}
});

let YearSchema = new Schema({
    name: { type: String, unique: true }
});

let TeacherSchema = new Schema({
    name: { type: String, unique: false },
    surname: { type: String, unique: false },
    email: { type: String, unique: true },
    password: { type: String, unique: false }
});

let CompetitionSchema = new Schema({
    name: { type: String, unique: true },
    insert_date: { type: Date, default: Date.now, unique: false },
    max_entry: {type: Number, unique: false },
    deadline: Date,
    decription: { type: String, required: false, unique: false },
    achivments_weight: { type: Schema.Types.Decimal128, default: 0.00, unique: false },
    _teacher_id: {type: Schema.Types.ObjectId, ref: 'Teacher'}
});

let CompetitionSubjectSchema = new Schema({
    subject_weight: { type: Schema.Types.Decimal128, default: 0.00 },
    _competition_id: {type: Schema.Types.ObjectId, ref: 'Competition'},
    _subject_id: {type: Schema.Types.ObjectId, ref: 'Subject'},
    _year_id: {type: Schema.Types.ObjectId, ref: 'Year'},
    _teacher_id: {type: Schema.Types.ObjectId, ref: 'Teacher'}
});

let ClassCompetitionSchema = new Schema({
    _competition_id: {type: Schema.Types.ObjectId, ref: 'Competition'},
    _class_id: {type: Schema.Types.ObjectId, ref: 'SClass'}
});

let SubjectSchema = new Schema({
    short_name: { type: String, unique: true },
    long_name: { type: String, unique: true },
});

let GradeSchema = new Schema({
    value: Number,
    date: { type: Date },
    _subject_id: {type: Schema.Types.ObjectId, ref: 'Subject'},
    _classStudentYear_id: {type: Schema.Types.ObjectId, ref: 'Ingredient'}
});

let AchivmentTypeSchema = new Schema({
    name: { type: String, unique: true },
    points: { type: Number, deafult: 1 },
});

let AchivmentLevelSchema = new Schema({
    name: { type: String, unique: true },
    points: { type: Number, deafult: 1 },
});

let AchivmentSchema = new Schema({
    name: { type: String, unique: false },
    date: { type: Date, default: Date.now },
    description: { type: String, unique: false },
    place: Number,
    _level_id: {type: Schema.Types.ObjectId, ref: 'Level'},
    _achivmentType_id: {type: Schema.Types.ObjectId, ref: 'Achivment'}
});

let ClassStudentYearSchema = new Schema({
    _student_id: {type: Schema.Types.ObjectId, ref: 'Student'},
    _year_id: {type: Schema.Types.ObjectId, ref: 'Year'},
    _class_id: {type: Schema.Types.ObjectId, ref: 'SClass'},
    confirmedGrades: { type: Boolean, default: false }
});

let AchivmentStudentSchema = new Schema({
    _classStudentYear_id: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
    _achivment_id: {type: Schema.Types.ObjectId, ref: 'Achivment'}
});

let ClassSubjectSchema = new Schema({
    _subject_id: {type: Schema.Types.ObjectId, ref: 'Subject'},
    _class_id: {type: Schema.Types.ObjectId, ref: 'SClass'},
});

let CompetitionStudentSchema = new Schema({
    _student_id: {type: Schema.Types.ObjectId, ref: 'Student'},
    _competition_id: {type: Schema.Types.ObjectId, ref: 'Competition'},
    date: { type: Date, default: Date.now }
});

var Student = mongoose.model("Student", StudentSchema);
var Teacher = mongoose.model("Teacher", TeacherSchema);
var School = mongoose.model("School", SchoolSchema);
var SClass = mongoose.model("SClass", ClassSchema);
var Year = mongoose.model("Year", YearSchema);
var Competition = mongoose.model("Competition", CompetitionSchema);
var AchivmentLevel = mongoose.model("AchivmentLevel", AchivmentLevelSchema);
var AchivmentType = mongoose.model("AchivmentType", AchivmentTypeSchema);
var Achivment = mongoose.model("Achivment", AchivmentSchema);
var AchivmentStudent = mongoose.model("AchivmentStudent", AchivmentStudentSchema);
var CompetitionStudent = mongoose.model("CompetitionStudent", CompetitionStudentSchema);
var ClassSubject = mongoose.model("ClassSubject", ClassSubjectSchema);
var Subject = mongoose.model("Subject", SubjectSchema);
var Grade = mongoose.model("Grade", GradeSchema);
var ClassStudentYear = mongoose.model("ClassStudentYear", ClassStudentYearSchema);
var CompetitionSubject = mongoose.model("CompetitionSubject", CompetitionSubjectSchema);
var ClassCompetition = mongoose.model("ClassCompetition", ClassCompetitionSchema);

module.exports = {
    Student, Teacher, School, SClass,
    Year, Competition, Achivment, AchivmentLevel,
    AchivmentStudent, CompetitionStudent, ClassSubject,
    Subject, AchivmentType, Grade, ClassStudentYear,
    CompetitionSubject, ClassCompetition
};