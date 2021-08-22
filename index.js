const connection = require('./connection')
const SQLrequest = require('./requests')(connection)
const express = require('express')
const server = express()
const port =  3000
const api = require('./api')(express.Router(), SQLrequest)

connection.on('connect', function (err) {
    if (err) {
        throw new Error(`Error connecting to database: ${err.message}`)
    } else {
        console.log("Connection to database successful");
        // server.use(express.urlencoded({
        //     extended: true
        // }));
        server.use(express.json());
        server.use("/api", api)
        server.listen(port, () => {
            console.log(`API Server listening at http://localhost:${port}/api`)
        })
    }        
});