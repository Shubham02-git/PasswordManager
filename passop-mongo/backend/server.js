const express = require('express')
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(cors())

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Passop';
client.connect();

//get the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

//save the passwords
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);
    res.json({sucess: true, findResult});
})

//delete the passwords
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password);
    res.json({sucess: true, findResult});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
