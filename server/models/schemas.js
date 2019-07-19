const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    name: { type: String },
    surname: { type: String },
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
    name: { type: String },
    surname: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
});

let CompetitionSchema = new Schema({
    name: { type: String, unique: true },
    insert_date: { type: Date, default: Date.now },
    max_entry: { type: Number, min: 1, required: false },
    deadline: { type: Date, required: false },
    decription: { type: String, required: false },
    achivments_weight: { type: Schema.Types.Decimal128, default: 0.00 },
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
    name: { type: String },
    date: { type: Date, default: Date.now },
    description: { type: String },
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

exports.Student = mongoose.model("Student", StudentSchema);
exports.School = mongoose.model("School", SchoolSchema);
exports.SClass = mongoose.model("SClass", ClassSchema);
exports.Year = mongoose.model("Year", YearSchema);
exports.Teacher = mongoose.model("Post", TeacherSchema);
exports.Competition = mongoose.model("Post", CompetitionSchema);
exports.CompetitionSubject = mongoose.model("Post", CompetitionSubjectSchema);
exports.ClassCompetition = mongoose.model("Post", ClassCompetitionSchema);
exports.Subject = mongoose.model("Post", SubjectSchema);
exports.Grade = mongoose.model("Post", GradeSchema);
exports.AchivmentType = mongoose.model("Post", AchivmentTypeSchema);
exports.AchivmentLevel = mongoose.model("Post", AchivmentLevelSchema);
exports.Achivment = mongoose.model("Post", AchivmentSchema);
exports.ClassStudentYear = mongoose.model("Post", ClassStudentYearSchema);
exports.AchivmentStudent = mongoose.model("Post", AchivmentStudentSchema);
exports.ClassSubject = mongoose.model("Post", ClassSubjectSchema);
exports.CompetitionStudent = mongoose.model("Post", CompetitionStudentSchema);