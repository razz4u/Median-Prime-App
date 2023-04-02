/*
const express = require('express');
const config = require('./config')
const cors = require('cors')
const app = express()
const getMedianPrimes = require('./services/getMedianPrimes')
*/
import express from 'express';
import config from './config';
import cors from 'cors';
import getMedianPrimes from './services/getMedianPrimes';

const app = express()

app.use(cors({
    origin: ['http://localhost:3001'],
    methods: ['GET']
  }));

const PORT = process.env.PORT || config.PORT || 3000
app.use(express.json())
app.listen(PORT, () => console.log('Server is running on port : ' + PORT));

app.get('/api/medianprime/:n', (req,res) => {
    if(req.params.n === undefined || req.params.n === ''){
        return res.status(400).json("Invalid user input")   
    }
    let n = Number(req.params.n);
    if(!Number.isInteger(n)){
        return res.status(400).json("Invalid user input")
    }
    
    let median = getMedianPrimes(n);
    res.status(200).json(median)
})

export default app;