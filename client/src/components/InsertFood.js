import React, {Fragment, useState} from "react";

const InsertFood = () => {

    // const [description, setDescription] = useState("Add Food Here...");
    const [fid, setFid] = useState()
    const [price, setPrice] = useState();
    const [storenum, setStorenum] = useState();
    const [branchnum, setBranchnum] = useState();

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            // const result = await pool.query("SELECT * FROM food WHERE fid = fid")
            // trying to check if the input fid already exists. If so, show message saying
            // data already exists. 
            const body = {fid, price, storenum, branchnum};
            console.log(body);
            const response = await fetch("http://localhost:3000/food", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.alert("Done!");
            window.location= "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className = "text-center mt-5">Insert New Food Item</h1>
            <form className = "d-flex mt-5" onSubmit={onSubmitForm}>
                <input type = "text" name = "inputBox" placeholder = "Food ID" className = "form-control" value = {fid}
                onChange = {e => setFid(e.target.value)}/>
                <input type = "text" name = "inputBox" placeholder = "Food Price" className = "form-control" value = {price}
                onChange = {e => setPrice(e.target.value)}/>
                <input type = "text" name = "inputBox" placeholder = "Store Number" className = "form-control" value = {storenum}
                onChange = {e => setStorenum(e.target.value)}/>
                <input type = "text" name = "inputBox" placeholder = "Branch Number" className = "form-control" value = {branchnum}
                onChange = {e => setBranchnum(e.target.value)}/>
                <button className = "btn btn-success">Insert</button>
            </form>
    </Fragment>
    );
    
}; 

export default InsertFood;
