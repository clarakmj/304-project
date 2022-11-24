const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { response } = require("express");

app.use(cors());
app.use(express.json());

// routes

// INSERT QUERY
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

// DELETE QUERY
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

// UPDATE QUERY
// update food price
app.put("/food/:id", async (req, res) => {
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

// SELECTION QUERY
// all members who go to a particular branch and membership ID > x
app.get("/member/:branchnum/:memid", async (req, res) => {
    try {
        const { branchnum, memid } = req.params;
        const members = await pool.query(
            "SELECT * FROM member WHERE branchnum = $1 AND memid > $2", [branchnum, memid]);
        res.json(members.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// PROJECTION QUERY
// get memnum, memid, expirydate of existing memberships
app.get("/membership", async (req, res) => {
    try {
        const membership = await pool.query(
            "SELECT memnum, memid, expirydate FROM membership");
        res.json(membership.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// JOIN QUERY
// get trainer id, member id, and equipment serial number given a specific member routine
app.get("/uses/:routine", async (req, res) => {
    try {
        const { routine } = req.params;
        const routineInfo = await pool.query(
            "SELECT t.tid, u.memid, u.serialnum FROM trains t, uses u WHERE u.routine = $1 AND t.memid = u.memid", [routine]);
        res.json(routineInfo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// AGGREGATE WITH GROUP BY QUERY
// get cafe store number and sum of food prices grouped by storenum
app.get("/foodsum", async (req, res) => {
    try {
        const food = await pool.query(
            "SELECT storenum, sum(price) FROM food GROUP BY storenum");
        res.json(food.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// AGGREGATE WITH HAVING QUERY
// get most expensive item from each store that sells more than 1 item
app.get("/fooditem", async (req, res) => {
    try {
        const food = await pool.query(
            "SELECT max(price), storenum FROM food GROUP BY storenum HAVING count(price) > 1");
        res.json(food.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// NESTED AGGREGATION WITH GROUP BY QUERY
// 


// DIVISION QUERY
// 

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
        const newEquipment = await pool.query(
            "INSERT INTO equipment (serialnum, ename, etype, estatus) VALUES($1, $2, $3, $4) RETURNING *", [serialnum, ename, etype, estatus]);
        res.json(newEquipment.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// create cafe
app.post("/cafe", async(req, res) => {
    try {
        const { storenum, branchnum } = req.body;
        const newCafe = await pool.query(
            "INSERT INTO cafe (storenum, branchnum) VALUES($1, $2) RETURNING *", [storenum, branchnum]);
        res.json(newCafe.rows[0]);
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

// get all gyms
app.get("/gym", async (req, res) => {
    try {
        const allGyms = await pool.query("SELECT * FROM gym");
        res.json(allGyms.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all managers
app.get("/manager", async (req, res) => {
    try {
        const allManagers = await pool.query("SELECT * FROM manager");
        res.json(allManagers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all trainers
app.get("/trainer", async (req, res) => {
    try {
        const trainer = await pool.query("SELECT * FROM trainer");
        res.json(trainer.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all memberships
// app.get("/membership", async (req, res) => {
//     try {
//         const membership = await pool.query("SELECT * FROM membership");
//         res.json(membership.rows);
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// get all equipment
// app.get("/equipment", async (req, res) => {
//     try {
//         const equipment = await pool.query("SELECT * FROM equipment");
//         res.json(equipment.rows[0]);
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// get all cafes
app.get("/cafe", async (req, res) => {
    try {
        const cafe = await pool.query("SELECT * FROM cafe");
        res.json(cafe.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get all food
app.get("/food", async (req, res) => {
    try {
        const food = await pool.query(
            "SELECT * FROM food");
        res.json(food.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get buys
app.get("/buys", async (req, res) => {
    try {
        const buys = await pool.query(
            "SELECT * FROM buys");
        res.json(buys.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// equipment grouped by status
// !! prob needs to be rewritten currently returning empty
app.get("/equipment", async (req, res) => {
    try {
        const equipment = await pool.query(
            "SELECT estatus FROM equipment WHERE etype = 'Strength' GROUP BY estatus");
        res.json(equipment.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get all food ids grouped by storenum having price < amount
app.get("/food/:amount", async (req, res) => {
    try {
        const { amount } = req.params;
        const food = await pool.query(
            "SELECT fid, price FROM food GROUP BY storenum HAVING SUM(price) < $1", [amount]);
        res.json(food.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// get cafe by storenum
app.get("/cafe:storenum", async (req, res) => {
    try {
        const {id} = req.params;
        const cafe = await pool.query("SELECT * FROM cafe WHERE storenum = $1", [storenum]);
        res.json(cafe.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get equipment by serialnum
app.get("/equipment:snum", async (req, res) => {
    try {
        const {id} = req.params;
        const equipment = await pool.query("SELECT * FROM equipment WHERE serialnum = $1", [snum]);
        res.json(equipment.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get member by memid
app.get("/member:id", async (req, res) => {
    try {
        const {id} = req.params;
        const member = await pool.query("SELECT * FROM member WHERE memid = $1", [id]);
        res.json(member.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// get manager by mid
app.get("/manager:id", async (req, res) => {
    try {
        const {id} = req.params;
        const manager = await pool.query("SELECT * FROM manager WHERE mid = $1", [id]);
        res.json(manager.rows[0]);
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
// !! which attribute to update is not yet specified
app.put("/member/:id", async (req, res) => {
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
// !! which attribute to update is not yet specified
app.put("/employee/:id", async (req, res) => {
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
// !! which attribute to update is not yet specified
app.put("/cafe/:storenum", async (req, res) => {
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
// !! which attribute to update is not yet specified
app.put("/equipment/:id", async (req, res) => {
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

app.listen(3000, () => {
    console.log("server has started on port 3000");
});