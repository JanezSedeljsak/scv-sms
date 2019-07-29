const express = require('express');
const router = express.Router();

const QueryBuilder = require('node-querybuilder');
const settings = {
    host: 'localhost',
    port: '3306',
    database: 'SZR_DB',
    user: 'root',
    password: ''
};

class DBMethods {
    static getClasses() {
        return new Promise(resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select("c.id, c.name as class, s.name").from('classes c')
                .join('schools s', 's.id=c.school_id', 'left')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getSubjects() {
        return new Promise(resolve => {
            const qb = new QueryBuilder(settings, 'mysql', 'single');

            qb.select("cs.class_id, s.name, s.short_name").from('classes_subjects cs')
                .join('subjects s', 's.id=cs.subject_id', 'left')
                .get((err, result) => {
                    qb.disconnect();
                    resolve(result);
                });
        });
    }

    static getFormatedClasses() {
        return new Promise(async resolve => {
            let classRes = await this.getClasses();
            let subjectsRes = await this.getSubjects();
    
            resolve(classRes.map(citem => {
                citem['subjects'] = subjectsRes
                    .filter(x => x.class_id == citem.id)
                    .map(x => {
                        delete x.class_id
                        return x;
                    });
        
                delete citem.id;
                return citem;
            })); 
        });
    }
}


router.get('/classes', async (req, res, next) => {
    res.status(200).json({
        ok: true,
        result: await DBMethods.getFormatedClasses()
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

router.get('/students-by-year', (req, res, next) => {
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
            'c.name as class',
            's.mail',
            'y.name as year',
            'ss.name as school',
            'gs.confirmed_grades'
        ]).from('gstudents gs')
            .where('year_id', req.body.id)
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
            'a.name as achivments',
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

router.post('/get-student-by-id', (req, res, next) => {
    if (Object.values(req.body).includes('')) {
        res.status(200).json({
            ok: false,
            result: 'Obrazec ni bil pravilno izpolnjen!'
        });
    } else {
        const qb = new QueryBuilder(settings, 'mysql', 'single');

        qb.select("*").from('students')
            .where('id', req.body.id)
            .get((err, result) => {
                qb.disconnect();
                res.status(200).json({
                    ok: true,
                    result: result[0]
                });
            });
    }
});

router.get('/teachers', (req, res, next) => {
    const qb = new QueryBuilder(settings, 'mysql', 'single');

    qb.select("*").from('teachers')
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

router.get('/competitions', (req, res, next) => {
    res.status(200).json({
        competitions: [{ name: 'Janez', surname: 'Kekec' },
        { name: 'Luka', surname: 'Neki' },
        { name: 'Pajdo', surname: 'Pajdo' }]
    });
});

module.exports = router;