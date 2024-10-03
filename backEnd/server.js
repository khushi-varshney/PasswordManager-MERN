import express from "express"
// const express = require('express')
// const dotenv = require('dotenv')
// const { MongoClient } = require('mongodb');
// const bodyParser = require('body-parser')
// const cors = require('cors')
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

dotenv.config()
const app = express()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const port = 3000
app.use(bodyParser.json())
app.use(cors())

await client.connect();

//get all the password
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save the password
app.post('/', async(req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success : true, result: findResult})
})

//delete a password
app.delete('/', async(req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success : true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})