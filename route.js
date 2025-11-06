const express = require('express');
const router = express.Router();
const mysql_connect = require('./mysql_connector');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Bcrypt ko import karein
const saltRounds = 10; // Hashing ke liye

router.use(bodyParser.urlencoded({ extended: true }));

// ===================================
// AAPKE SA BHI 'GET' ROUTES
// ===================================

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/index', (req, res) => res.render('index'));
router.get('/about', (req, res) => res.render('about'));
router.get('/services', (req, res) => res.render('services'));
router.get('/apartment', (req, res) => res.render('apartment'));
router.get('/blog', (req, res) => res.render('blog'));
router.get('/contact', (req, res) => res.render('contact'));


// ===================================
// REGISTER ROUTE (PASSWORD HASHING KE SAATH)
// ===================================
router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post((req, res) => {
        mysql_connect.getConnection((err, connection) => {
            if (err) return res.status(500).send('Database Connection Failed');

            const { name, email, password, image } = req.body;

            // Password ko hash karein
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                if (err) return res.status(500).send('Hashing Failed');

                const query = 'INSERT INTO register (name, email, password, image) VALUES (?, ?, ?, ?)';
                
                // Naya 'hashedPassword' database mein save karein
                connection.query(query, [name, email, hashedPassword, image], (err) => {
                    connection.release();
                    if (err) return res.status(500).send('Database Query Failed');
                    res.render('login', { message: `${name} Added Successfully` });
                });
            });
        });
    });

// ===================================
// LOGIN ROUTE (PASSWORD HASHING KE SAATH)
// ===================================
router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        mysql_connect.getConnection((err, connection) => {
            if (err) return res.status(500).send('Database Connection Failed');

            const { email, password } = req.body;
            const query = 'SELECT * FROM register WHERE email = ?';

            connection.query(query, [email], (err, results) => {
                connection.release();
                if (err) return res.status(500).send('Database Query Failed');

                if (results.length > 0) {
                    const user = results[0];
                    
                    // Password ko compare karein
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (isMatch) {
                            // Password sahi hai
                            res.render('index');
                        } else {
                            // Password galat hai
                            res.render('login', { message: 'Incorrect email or password' });
                        }
                    });
                } else {
                    // User nahin mila
                    res.render('login', { message: 'Incorrect email or password' });
                }
            });
        });
    });

module.exports = router;