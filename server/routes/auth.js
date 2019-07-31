const express = require('express');
const CryptoJS = require('crypto-js');
const SHA256 = require("crypto-js/sha256")
const router = express.Router();

const QueryBuilder = require('node-querybuilder');
const settings = {
    host: 'localhost',
    port: '3306',
    database: 'SZR_DB',
    user: 'root',
    password: ''
};

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
        //new mysql insert TODO
        /*let newAdmin = new Teacher({
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
        });*/
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

        qb.select("id").from('teachers')
            .where({
                mail: req.body.mail,
                password: hash(req.body.pass).toString()
            })
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
                        res.status(200).json({
                            ok: true,
                            result: await generateToken({
                                _id: result[0].id,
                                _rights: 'admin'
                            })
                        });
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