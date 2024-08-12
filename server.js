const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to Database
connectDB()

// Routes files
const bootcamps = require('./routes/bootcamps')

const app = express()

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    server.close(() => process.exit(1))
})