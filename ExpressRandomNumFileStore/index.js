const express = require('express');
//const mongoose = require('mongoose');
const fs = require('fs');

// Create an instance of Express
const app = express();

// Middleware
app.use(express.json());
/*
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
*/
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/random', (req, res) => {
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 100);

    // Append the random number to the text file
    fs.appendFile('randomNumber.txt', randomNumber.toString() + '\n', (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        } else {
            console.log('Random number appended to randomNumber.txt');
        }
    });

    // Read the contents of the text file
    fs.readFile('randomNumber.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('Contents of randomNumber.txt:', data);
        }
    });

    res.send(randomNumber.toString());
});


// Start the server
const port =  5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
