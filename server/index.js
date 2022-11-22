const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// routes

// create member
app.post("/member", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO gym (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create employee
app.post("/employee", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO manager (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
});

// create equipment
app.post("/equipment", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO equipment (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
});

// create cafe
app.post("/cafe", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO cafe (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
});


// get all members
app.get("/member", async (req, res) => {
    try {
        const allMembers = await pool.query("SELECT * FROM member");
        res.json(allMembers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all employees
app.get("/employee", async (req, res) => {
    try {
        const allEmployees = await pool.query("SELECT * FROM employee");
        res.json(allEmployees.rows);
    } catch (err) {
        console.log(err.message);
    }
});

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