import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';


dotenv.config();
const app = express();


app.use(express.json());


mongoose.connect('mongodb+srv://portfolio:portfoliopassword@portfolio-dev.nfru9hr.mongodb.net/?appName=portfolio-dev')
    .then((val) => {
        console.log('connected to DB successfully')
    })


app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log('error', error)
    }
    console.log(`Server is running on ${process.env.PORT}`)
})