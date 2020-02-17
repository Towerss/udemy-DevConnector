const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to database
connectDB();

//Initialize middlware
app.use(express.json({ extended: false }));

//Route response for home page or root directory
app.get('/', (req, res) => {
    res.send('API running');
});

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if(err) throw err
    console.log(`Server started on port: ${PORT}`);
});