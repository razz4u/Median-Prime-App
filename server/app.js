import express from 'express';
import config from './config';
import cors from 'cors';
import getMedianPrimes from './services/getMedianPrimes';

const app = express()

app.use(cors({
    origin: config.ALLOWED_CLIENT,
    methods: config.METHODS
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

    try {
        let median = getMedianPrimes(n);
        res.status(200).json(median)
    } catch (error) {
        res.status(500).json(error)
    }

})

export default app;