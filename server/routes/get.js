const express = require('express');
const router = express.Router();
const settings = require("./connect");
const QueryBuilder = require('node-querybuilder');

class DBMethods {
    static getCompetitions() {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');
    
            qb.select([
                'c.id as id',
                'CONCAT(t.name, " ", t.surname) AS teacher',
                'c.name as competition',
                'c.deadline',
                'c.date_created',
                'c.places',
                'c.description'
            ]).from('competitions c')
                .join('teachers t', 't.id=c.teacher_id', 'left')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }


    static getMessages() {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');
    
            qb.order_by('m.date_sent', 'desc').select([
                'CONCAT(s.name, " ", s.surname) AS student',
                'm.date_sent',
                'st.value',
                'm.header',
                'm.content'
            ]).from('messages m')
                .join('states st', 'st.id=m.state_id', 'left')
                .join('students s', 's.id=m.student_id', 'left')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }


    static getMessageCount() {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.where({'st.id': '06b1c46e-b3da-11e9-be63-902b34549865'})
                .from('messages m')
                .join('states st', 'st.id=m.state_id', 'left')
                .count('', (err, count) => {
                resolve(count);
            });
        });
    }

    static getStudentsInCompetition(idCompetition) {
        return new Promise(async resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');
    
            qb.select([
                'ss.name as school',
                'c.name as class',
                's.name',
                's.id',
                's.surname'
            ]).from('competitions_students cs')
                .join('gstudents gs', 'gs.id=cs.gstudent_id', 'left')
                .join('students s', 's.id=gs.student_id', 'left')
                .join('classes c', 'c.id=gs.class_id', 'left')
                .join('schools ss', 'ss.id=c.school_id', 'left')
                .where({'cs.competition_id': idCompetition})
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }


    static getCompetitionData(id) {
        return new Promise(async resolve => {
            
            let competitionBase = await new Promise(async resolve => {
                const qb = new QueryBuilder(settings, 'mysql', 'single');
        
                qb.select([
                    'CONCAT(t.name, " ", t.surname) AS teacher',
                    'c.name',
                    'c.deadline',
                    'c.date_created',
                    'c.places'
                ]).from('competitions c')
                    .where('c.id', id)
                    .join('teachers t', 't.id=c.teacher_id', 'left')
                    .get((err, result) => {
                        qb.disconnect();
                        resolve(result);
                    });
            });
            let competitionTypes = await new Promise(async resolve => {
                const qb = new QueryBuilder(settings, 'mysql', 'single');
        
                qb.select([
                    'ct.value',
                    't.name as type'
                ]).from('competitions_types ct')
                    .join('types t', 't.id=ct.type_id', 'left')
                    .where('ct.competition_id', id)
                    .get((err, result) => {
                        qb.disconnect();
                        resolve(result);
                    });
            });

            let competitionsSubjects = await new Promise(async resolve => {
                const qb = new QueryBuilder(settings, 'mysql', 'single');
        
                qb.select([
                    's.name',
                    's.short_name',
                    'cs.value'
                ]).from('competitions_subjects cs')
                    .join('subjects s', 's.id=cs.subject_id', 'left')
                    .where('cs.competition_id', id)
                    .get((err, result) => {
                        qb.disconnect();
                        resolve(result);
                    });
            });

            let competitionClasses = await new Promise(async resolve => {
                const qb = new QueryBuilder(settings, 'mysql', 'single');
        
                qb.select([
                    'c.name as class',
                    's.name as school'
                ]).from('classes_competitions cc')
                    .join('classes c', 'c.id=cc.class_id', 'left')
                    .join('schools s', 's.id = c.school_id', 'left')
                    .where('cc.competition_id', id)
                    .get((err, result) => {
                        qb.disconnect();
                        resolve(result);
                    });
            });

            let competitionStudents = await new Promise(async resolve => {
                const qb = new QueryBuilder(settings, 'mysql', 'single');
        
                qb.select([
                    's.name', 
                    's.surname'
                ]).from('competitions_students cs')
                    .join('gstudents gs', 'gs.id=cs.gstudent_id', 'left')
                    .join('students s', 's.id = gs.student_id', 'left')
                    .where('cs.competition_id', id)
                    .get((err, result) => {
                        qb.disconnect();
                        resolve(result);
                    });
            });

            resolve({
                base: competitionBase,
                classes: competitionClasses,
                subjects: competitionsSubjects,
                types: competitionTypes,
                students: competitionStudents
            });
        });
    }

    static getStudentByQID(qid) {
        return new Promise(resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select([
                's.id',
                's.name',
                's.surname',
                'c.name as class'
            ]).from('gstudents gs')
            .join('students s', 's.id=gs.student_id', 'left')
            .join('classes c', 'c.id=gs.class_id', 'left')
            .where({'gs.id': qid})
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });    
    }

    static getGradesByQID(qid) {
        return new Promise(resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.distinct().select([ 
                's.name', 
                's.short_name as shortname',
                'g.grade'
            ]).from('gstudents gs')
            .join('classes c', ' c.id = gs.class_id', 'left')
            .join('classes_subjects cs', 'cs.class_id = c.id', 'left')
            .join('subjects s', 's.id = cs.subject_id', 'left')
            .join('grades g', 'g.subject_id = s.id', 'left outer')
            .where(`
                (gs.id = g.gstudent_id OR g.gstudent_id IS NULL) AND
                (gs.id = '${qid}' OR g.gstudent_id IS NULL)
            `)
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });       
    }

    static getClasses() {
        //return new Promise(async resolve => {
        return new Promise(resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select("c.id, c.name as class, s.name as school").from('classes c')
                .join('schools s', 's.id=c.school_id', 'left')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
            /*let subjectsRes = await new Promise(resolve => {
                const qb = new QueryBuilder(settings, 'mysql', 'single');
    
                qb.select("cs.class_id, s.name, s.short_name").from('classes_subjects cs')
                    .join('subjects s', 's.id=cs.subject_id', 'left')
                    .get((err, result) => {
                        qb.disconnect();
                        resolve(result);
                    });
            });
    
            resolve(classRes.map(citem => {
                citem.subjects = subjectsRes.filter(x => x.class_id == citem.id)
                citem.tView = false;
                return citem;
            })); 
        });*/
    }

    static getSubjects() {
        return new Promise(resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select("id, name, short_name as shortname").from('subjects')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });    
    }
}

router.get('/messages', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getMessages()
    })  
});

router.get('/message-count', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getMessageCount()
    })  
});

router.get('/subjects', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getSubjects()
    })  
});

router.post('/competition-students', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getStudentsInCompetition(req.body.id)
    })  
});

router.post('/competition-by-id', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getCompetitionData(req.body.id)
    })  
});

router.get('/competitions', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getCompetitions()
    })
})


router.get('/classes', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getClasses()
    });
});

router.get('/students', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("*").from('students')
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});


router.get('/curr-year', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');
    let currentDate = new Date();
    qb.limit(1)
        .select("id")
        .from('years')
        .where({'start_date <=': currentDate, 'end_date >=': currentDate})
            .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result[0]
            });
        });
});

router.get('/schools', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("*").from('schools')
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});

router.get('/years', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("*").from('years')
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});

router.post('/students-by-year', (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else {
        const qb = new QueryBuilder(settings, 'mysql', 'single');
        console.log("line 321", req.body)

        qb.select([
            's.name',
            's.surname',
            'c.name as class',
            's.mail',
            'gs.id',
            'y.name as year',
            'ss.name as school',
            'gs.confirmed_grades'
        ]).from('gstudents gs')
            .where('gs.year_id', req.body.year)
            .join('students s', 's.id=gs.student_id', 'left')
            .join('classes c', 'c.id=gs.class_id', 'left')
            .join('years y', 'y.id=gs.year_id', 'left')
            .join('schools ss', 'ss.id=c.school_id', 'left')
            .get((err, result) => {
                qb.disconnect();
                res.status(200).json({
                    ok: true,
                    result: result
                });
            });
    }
});


router.get('/achivments', (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else {
        const qb = new QueryBuilder(settings, 'mysql', 'single');

        qb.select([
            's.name as studentname',
            's.surname',
            'a.date',
            'a.id',
            'a.name as achivmentname',
            'a.description',
            't.name as type',
            'l.name as level'
        ]).from('achivments a')
            .join('achivments_students  as', 'as.achivment_id = a.id', 'left')
            .join('types t', 't.id = a.type_id', 'left')
            .join('levels l', 'l.id = a.level_id', 'left')
            .join('students s', 's.id = as.student_id', 'left')
            .get((err, result) => {
                qb.disconnect();
                res.status(200).json({
                    ok: true,
                    result: result
                });
            });
    }
});

router.post('/get-student-by-qid', async (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else {
        res.status(200).json({
            ok: true,
            result: await DBMethods.getStudentByQID(req.body.id)
        });
    }
});


router.post('/get-grades-by-qid', async (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else {
        res.status(200).json({
            ok: true,
            result: await DBMethods.getGradesByQID(req.body.id)
        });
    }
});

router.post('/get-grades-by-qid', async (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else {
        res.status(200).json({
            ok: true,
            result: await DBMethods.getGradesByQID(req.body.id)
        });
    }
});

router.get('/teachers', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("t.id, t.name, t.surname, t.mail, s.name as school").from('teachers t')
        .join('schools s', 's.id=t.school_id', 'left')
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});

router.get('/teachers-for-picker', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("id, name, surname").from('teachers')
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});


router.get('/types', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("*").from('types')
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});

router.get('/levels', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("*").from('levels')
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
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

module.exports = router;