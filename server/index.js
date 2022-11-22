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
        const { branchnum, capacity, city, mid } = req.body;
        const newGym = await pool.query(
            "INSERT INTO gym (branchnum, capactiy, city, mid) VALUES($1, $2, $3, $4) RETURNING *", [branchnum, capacity, city, mid]);
        res.json(newGym);
    } catch (err) {
        console.log(err.message);
    }
});

// create member
app.post("/member", async(req, res) => {
    try {
        const { memid, phonenum, streetaddr, memname, membershipnum, branchnum } = req.body;
        const newMember = await pool.query(
            "INSERT INTO member (memid, phonenum, streetaddr, memname, membershipnum, branchnum) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [memid, phonenum, streetaddr, memname, membershipnum, branchnum]);
        res.json(newMember.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create membership
app.post("/membership", async(req, res) => {
    try {
        const { memnum, expirydate, memid, amenityaccess, hasmassage, hasfitnessclass } = req.body;
        const newMembership = await pool.query(
            "INSERT INTO membership (memnum, expirydate, memid, amenityaccess, hasmassage, hasfitnessclass) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [memnum, expirydate, memid, amenityaccess, hasmassage, hasfitnessclass]);
        res.json(newMembership.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create trainer
app.post("/trainer", async(req, res) => {
    try {
        const { tid, tname } = req.body;
        const newTrainer = await pool.query(
            "INSERT INTO trainer (tid, tname) VALUES($1, $2) RETURNING *", [tid, tname]);
        res.json(newTrainer.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create manager
app.post("/employee", async(req, res) => {
    try {
        const { mid, mname, gymnum } = req.body;
        const newManager = await pool.query(
            "INSERT INTO manager (mid, mname, gymnum) VALUES($1, $2, $3) RETURNING *", [mid, mname, gymnum]);
        res.json(newManager.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create equipment
app.post("/equipment", async(req, res) => {
    try {
        const { serialnum, ename, etype, estatus } = req.body;
        const newEquipment = await pool.query("INSERT INTO equipment (serialnum, ename, etype, estatus) VALUES($1, $2, $3, $4) RETURNING *", [serialnum, ename, etype, estatus]);
        res.json(newEquipment.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create cafe
app.post("/cafe", async(req, res) => {
    try {
        const { storenum, branchnum } = req.body;
        const newCafe = await pool.query("INSERT INTO cafe (storenum, branchnum) VALUES($1, $2) RETURNING *", [storenum, branchnum]);
        res.json(newCafe.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create food
app.post("/food", async(req, res) => {
    try {
        const { fid, price, storenum, branchnum } = req.body;
        const newFood = await pool.query("INSERT INTO food (fid, price, storenum, branchnum) VALUES($1, $2, $3, $4) RETURNING *", [fid, price, storenum, branchnum]);
        res.json(newFood.rows[0]);
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

// get all member id's of members whose gym is in a particular city
app.get("/member:city", async (req, res) => {
    try {
        const { city } = req.params;
        const cityMembers = await pool.query(
            "SELECT * FROM member m, gym g WHERE m.branchnum = g.branchnum AND g.city = $1", [city]);
        res.json(cityMembers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all members with specific branchnum
app.get("/member:branch", async (req, res) => {
    try {
        const { branch } = req.params;
        const branchMembers = await pool.query(
            "SELECT memid, branchnum FROM member WHERE branchnum = $1", [branch]);
        res.json(branchMembers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// equipment grouped by status
app.get("/equipment", async (req, res) => {
    try {
        const equipment = await pool.query(
            "SELECT ename, estatus FROM equipment GROUP BY estatus");
        res.json(equipment.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all food ids grouped by storenum having price < amount
app.get("/food:amount", async (req, res) => {
    try {
        const { amount } = req.params;
        const food = await pool.query(
            "SELECT fid, price FROM food GROUP BY storenum HAVING SUM(price) < $1", [amount]);
        res.json(food.rows);
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
app.get("/cafe:storenum", async (req, res) => {
    try {
        const {id} = req.params;
        const cafe = await pool.query("SELECT * FROM cafe WHERE storenum = $1", [storenum]);
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

// TODO: get trainers who work at all the gyms
app.get("/trainer", async (req, res) => {
    try {
        const trainers = await pool.query(
            "SELECT * FROM trainer");
        res.json(trainers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// update member
app.put("/member:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateMember = await pool.query("UPDATE member SET description = $1 WHERE member_id = $2",
            [description, id]);
        res.json("Member updated!")
    } catch (err) {
        console.log(err.message);
    }
});

// update employee
app.put("/employee:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateEmployee = await pool.query("UPDATE member SET description = $1 WHERE employee_id = $2",
            [description, id]);
        res.json("Employee updated!")
    } catch (err) {
        console.log(err.message);
    }
});

// update cafe
app.put("/cafe:storenum", async (req, res) => {
    try {
        const {storenum} = req.params;
        const {description} = req.body;
        const updateCafe = await pool.query("UPDATE member SET description = $1 WHERE storenum = $2",
            [description, storenum]);
        res.json("Cafe updated!")
    } catch (err) {
        console.log(err.message);
    }
});

// update equipment
app.put("/equipment:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateEquipment = await pool.query("UPDATE member SET description = $1 WHERE serialnum = $2",
            [description, id]);
        res.json("Equipment updated!")
    } catch (err) {
        console.log(err.message);
    }
});

// delete food
app.delete("/food/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const deleteFood = await pool.query(
            "DELETE FROM food WHERE fid = $1", [id]);
        res.json("Food was deleted");
    } catch (error) {
        console.log(err.message);
    }
})

// update food price
app.put("/food:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;
        const updateFood = await pool.query(
            "UPDATE food SET price = $1 WHERE fid = $2",
            [price, id]);
        res.json("Food price updated!")
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(3000, () => {
    console.log("server has started on port 3000");
});