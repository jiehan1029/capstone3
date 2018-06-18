const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.post('/api/users/login', bodyParser.json(), (req, res) => {
    // TODO: Validate the field types
    if (req.body.password.toLowerCase() !== 'demoPassword') {
        return res.status(400).json({
            message: 'Incorrect password',
            reason: 'ValidationError',
            location: 'password'
        });
    }
    // TODO: Store the message
    return res.status(204).json('correct password').end();
});

app.listen(8080);