const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// routes

// create member

// create employee

// create equipment

// get all members

// get all employees

// get cafe

// get equipment

// update member

// update employee

// update cafe

// update equipment

// etc

app.listen(3000, () => {
    console.log("server has started on port 3000");
});