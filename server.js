const express = require('express')
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // if the connection is not successfull
    if(err) {
        console.log("Error connecting to the database: ", err)
    }
    // connection is successfull
    console.log("successfully connected to Mysql: ", db.threadId)

})


// Question 1. retrieve all patients
app.get('', (req,res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        // if i have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
})


// Question 2. retrieve all providers
app.get('/providers', (req,res) => {
    const getProviders = "SELECT first_name, last_name, provider_speciality FROM providers"
    db.query(getProviders, (err, data) => {
        // if i have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).send(data)
    })
})

// Question 3. filter patients by first name
app.get('', (req,res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, data) => {
        // if i have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
})


// Question 4. retrieve all providers by their speciality
app.get('/providers', (req,res) => {
    const getProviders = "SELECT provider_speciality FROM providers"
    db.query(getProviders, (err, data) => {
        // if i have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).send(data)
    })
})

// start and listen to the server
app.listen(3300, () => {
    console.log('server is running on port 3300...')
})