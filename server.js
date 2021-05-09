const express = require('express');
//const path = require('path');
const cors = require('cors');
const client = require('./db');


const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());
// server.use(middleware);
// server.use('/arun', express.static(path.join(__dirname, "..", 'FrontEND')));
// console.log(path.join(__dirname, "..", 'FrontEND'));

server.get('/', (req, res) => {
    console.log(req.url);

    client.query("SELECT * FROM users", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error At Database");
        } else {
            console.log(data);
            res.status(200).send(data.rows);
        }
    })
})

server.post('/addUser', (req, res) => {
    console.log(req.body);
    const userKey = req.body.userKey;
    const secretKey = req.body.secretKey;
    if (secretKey == '1234' && userKey == 'arun') {
        client.query(`INSERT INTO users (username, email) values ('${req.body.newUser.username}', '${req.body.newUser.email}');`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error At Database");
            } else {
                console.log(data);
                client.query("SELECT * FROM users", (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error At Database");
                    } else {
                        console.log(data);
                        res.status(200).send(data.rows);
                    }
                })
            }
        });

    } else { res.status(400).send('Not Cool') };
})

server.listen(port, () => {
    console.log(`listening on port ${port}`);
})