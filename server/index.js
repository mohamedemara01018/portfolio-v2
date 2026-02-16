import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import projectRouter from './routes/projects.route.js'

dotenv.config();
const app = express();


app.use(express.json());
app.use('/', projectRouter)


mongoose.connect('mongodb+srv://portfolio:portfoliopassword@portfolio-dev.nfru9hr.mongodb.net/?appName=portfolio-dev')
    .then((val) => {
        console.log('connected to DB successfully')
    })

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500)
        .json({ status: error.statusText || 'rejected', message: error.message || 'internal server error' })
})


app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log('error', error)
    }
    console.log(`Server is running on ${process.env.PORT}`)
})

