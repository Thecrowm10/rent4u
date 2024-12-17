const express = require('express');
const router = express.Router();
const mysql_connect = require('./mysql_connector');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('index');
});

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        mysql_connect.getConnection((err, connection) => {
            if (err) {
                return res.status(500).send('Database Connection Failed');
            }

            const { email, password } = req.body;
            const query = 'SELECT * FROM register WHERE email = ? AND password = ?';

            connection.query(query, [email, password], (err, results) => {
                connection.release();

                if (err) {
                    return res.status(500).send('Database Query Failed');
                }

                if (results.length > 0) {
                    res.render('index');
                } else {
                    res.render('login', { message: 'Incorrect email or password' });
                }
            });
        });
    });

router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        mysql_connect.getConnection((err, connection) => {
            if (err) {
                return res.status(500).send('Database Connection Failed');
            }

            const { name, email, password, image } = req.body;
            const query = 'INSERT INTO register (name, email, password, image) VALUES (?, ?, ?, ?)';

            connection.query(query, [name, email, password, image], (err) => {
                connection.release();

                if (err) {
                    return res.status(500).send('Database Query Failed');
                }

                res.render('login', { message: `${name} Added Successfully` });
            });
        });
    });

router.get('/index', (req, res) => res.render('index'));
router.get('/about', (req, res) => res.render('about'));
router.get('/services', (req, res) => res.render('services'));
router.get('/apartment', (req, res) => res.render('apartment'));
router.get('/blog', (req, res) => res.render('blog'));
router.get('/contact', (req, res) => res.render('contact'));

module.exports = router;
