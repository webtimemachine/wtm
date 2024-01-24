require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
const UAparser = require('ua-parser-js');
const cors = require('cors');
const fs = require('fs');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
const database = require('./database');
const Log = require('./models/Log');

const app = express();
const port = process.env.PORT || 8080;

// app.use(morgan('combined'));

app.use(function(req, res, next) {
    res.header("ngrok-skip-browser-warning", "*");
    next();
});
app.use(cors(corsOptions));

app.get('/logs', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 50;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    try {
        const logs = await Log.findAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });
        const count = await Log.count();
        res.json({urls: logs, count});
    } catch (error) {
        console.error('Error while fetching logs:', error);
        res.status(500).json({ error: 'An error occurred while fetching logs' });
    }
});

app.get('/', async (req, res) => {
    const UA = UAparser(req.headers['user-agent']);

    const url = req.query.url;

    console.log(url, UA?.browser?.name, UA?.browser?.version, UA?.os?.name, UA?.os?.version);

    if (url) {
        Log.create({
          url: url,
          browserName: UA?.browser?.name,
          browserVersion: UA?.browser?.version,
          osName: UA?.os?.name,
          osVersion: UA?.os?.version
        });        
    }


    res.send('Ok');
});


app.listen(port, () => {
    console.log(`Express server running at ${port}`);
});

async function getNgrokUrl() {
    try {
        const response = await fetch('http://ngrok:4040/api/tunnels');
        const data = await response.json();
        const publicUrl = data.tunnels[0].public_url.replace("http://","https://"); // Obtener la primera URL pública

        // Actualizar el archivo content.js con la nueva URL
        const contentJsPath = 'content.js';
        const contentJs = fs.readFileSync(contentJsPath, 'utf8');
        const updatedContentJs = contentJs.replace(/(const SERVER_URL = ')[^']+';/, `$1${publicUrl}';`);
        fs.writeFileSync(contentJsPath, updatedContentJs);

        return publicUrl;
    } catch (error) {
        console.error('Error while getting the URL of Ngrok:', error);
        return null;
    }
}

getNgrokUrl().then(url => console.log('Ngrok URL:', url));
