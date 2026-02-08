const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res)=>
{
    res.send("Expense Tracker API is Running");
    
});

app.listen(PORT, ()=> {
    console.log(`Server is Running in ${PORT}`);
});


