const express = require('express');
const app = express();

const connectDB = require('./config/db');


const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// Init middlewares
app.use(express.json({ extended: false }));

// routes
app.get("/", (req, res) => {
    res.send("hello world");
});

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/bunch', require('./routes/api/bunch'))
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => {
    console.log("server up and running");
})