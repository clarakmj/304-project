const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// routes

// create gym
app.post("/gym", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO gym (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
});

// create member
app.post("/member", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO member (description) VALUES($1) RETURNING *", [description]);
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

// create food
app.post("/food", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO food (description) VALUES($1) RETURNING *", [description]);
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
app.get("/cafe:id", async (req, res) => {
    try {
        const {id} = req.params;
        const cafe = await pool.query("SELECT * FROM cafe WHERE storenum = $1", [id]);
        res.json(cafe.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get equipment
app.get("/equipment:snum", async (req, res) => {
    try {
        const {id} = req.params;
        const equipment = await pool.query("SELECT * FROM equipment WHERE serialnum = $1", [snum]);
        res.json(equipment.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get member
app.get("/member:id", async (req, res) => {
    try {
        const {id} = req.params;
        const member = await pool.query("SELECT * FROM member WHERE memid = $1", [id]);
        res.json(member.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get manager
app.get("/manager:id", async (req, res) => {
    try {
        const {id} = req.params;
        const manager = await pool.query("SELECT * FROM manager WHERE mid = $1", [id]);
        res.json(manager.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get trainer
app.get("/trainer:id", async (req, res) => {
    try {
        const {id} = req.params;
        const trainer = await pool.query("SELECT * FROM trainer WHERE tid = $1", [id]);
        res.json(trainer.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// update member

// update employee

// update cafe

// update equipment

// etc

app.listen(3000, () => {
    console.log("server has started on port 3000");
});