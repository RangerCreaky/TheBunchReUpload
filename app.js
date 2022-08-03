const express = require('express');
const app = express();
const path = require('path');

const connectDB = require('./config/db');


const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// Init middlewares
app.use(express.json({ limit: '50mb', extended: false }));

// routes

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/bunch', require('./routes/api/bunch'))
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// serve static assets in production
if (PROCESS.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log("server up and running");
})