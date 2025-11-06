require('dotenv').config(); 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const myrouter = require('./route'); // Aapki route file

const app = express();

// Port setup jo Render.com aur local machine, donon par kaam karega
const PORT = process.env.PORT || 2002;

// 1. View Engine (EJS) ko set karna
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ye line add karna best practice hai

// 2. Body Parser ko set karna (form ka data padhne ke liye)
app.use(bodyParser.urlencoded({ extended: false }));

// 3. Static folder (CSS, Images) ko set karna
// Aapka CSS link <link href="/static/css/style.css"> jaisa hona chahiye
app.use("/static", express.static(path.join(__dirname, 'static')));

// 4. Apni sabhi routes ko use karna
app.use('/', myrouter);

// 5. Server ko start karna
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});