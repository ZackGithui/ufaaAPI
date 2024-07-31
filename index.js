const express = require("express");
const sql = require("mssql");
const app = express();
require("dotenv").config()


// Define the connection configuration
const config = {
    user: process.env.user,
    password: process.env.password,
    server: process.env.server, 
    database: process.env.database,
    options: {
        encrypt: true, // for Azure, change to false for local SQL Server
        trustServerCertificate: true // change to true for self-signed certificates
    }
};

// Routes
app.get('/ufaa', (req, res) => {
    res.send("Welcome to ufaa api!");
    

});

// A route to query the database
app.get('/ufaa/name/:name', async (req, res) => {
    const name = req.params.name;

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT [Name],[ID Number],[Owners Postal Address], [Amount Due to Owner],[Holder Name] FROM [Live-UFAA$Item] WHERE  Name  = ${name}`;
        console.dir(result);
        res.json(result.recordset);
        console.log("Query executed successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Database query failed");
    }
});

app.get('/ufaa/address/:postalAddress',async (req,res) =>{
    const postalAddress=req.params.postalAddress
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT [Name],[ID Number],[Owners Postal Address], [Amount Due to Owner],[Holder Name] FROM [Live-UFAA$Item] WHERE  [Owners Postal Address]  = ${postalAddress}`;
        console.dir(result);
        res.json(result.recordset);
        console.log("Query executed successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Database query failed");
    }

});
app.get('/ufaa/id/:idNumber',async (req,res) =>{
    const idNumber=req.params.idNumber
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT [Name],[ID Number],[Owners Postal Address], [Amount Due to Owner],[Holder Name] FROM [Live-UFAA$Item] WHERE  [ID Number]  = ${idNumber}`;
        console.dir(result);
        res.json(result.recordset);
        console.log("Query executed successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Database query failed");
    }

});

// Start the server
app.listen(3000, () => {
    console.log("Node API is running on port 3000!");
});
