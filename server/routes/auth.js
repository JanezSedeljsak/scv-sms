const express = require('express');
const CryptoJS = require('crypto-js');
const router = express.Router();
var passwordHash = require('password-hash');


const QueryBuilder = require('node-querybuilder');
const settings = {
    host: 'localhost',
    port: '3306',
    database: 'SZR_DB',
    user: 'root',
    password: 'root'
};

const hash = pass => passwordHash.generate(pass)

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
        const qb = new QueryBuilder(settings, 'mysql', 'single');
        const data = { 
            name: req.body.name, 
            surname: req.body.surname,
            mail: req.body.mail,
            school_id: req.body.school,
            password: hash(req.body.pass).toString()
        };

        qb.returning('id').insert('Teachers', data, (err, result) => {
            if (err) {
                console.log(err);
                res.status(200).json({
                    ok: false,
                    result: 'Pojavila se je napaka'
                });
            }
            else {
                res.status(200).json({
                    ok: false,
                    result: 'Nov admin je bil dodan'
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
        const qb = new QueryBuilder(settings, 'mysql', 'single');

        qb.select("id, password").from('teachers')
            .where({ mail: req.body.mail })
            .get(async (error, result) => {
                qb.disconnect();
                if (error) {
                    res.status(200).json({
                        ok: false,
                        result: 'Pojavila se je napaka pri iskanju uporabnika!'
                    });
                } else {
                    if (!result.length) {
                        res.status(200).json({
                            ok: false,
                            result: "Uporabnik ni bil najden!"
                        });
                    } else {
                        let pass = result[0].password;
                        var passwordHash = require('password-hash/lib/password-hash');
                        if(passwordHash.verify(req.body.pass, pass)) {
                            res.status(200).json({
                                ok: true,
                                result: await generateToken({
                                    _id: result[0].id,
                                    _rights: 'admin'
                                })
                            });
                        } else {
                            res.status(200).json({
                                ok: false,
                                result: {pass: pass, sent: req.body.pass}
                            });         
                        }
 
                    }
                }
            });
    }
});


router.post('/get-rights', async (req, res, next) => {
    console.log(req.body.tokenString);
    let token = await parseToken(req.body.tokenString);
    res.status(200).json({
        ok: true,
        result: { _rights: token._rights }
    });
});


router.post('/get-username', async (req, res, next) => {
    let token = await parseToken(req.body.tokenString);
    const qb = new QueryBuilder(settings, 'mysql', 'single');
    console.log(token, "129");
    qb.select("name, surname").from('teachers')
        .where('id', token._id)
        .get((err, result) => {
            qb.disconnect();
            res.status(200).json({
                ok: true,
                result: result
            });
        });
});


module.exports = router;