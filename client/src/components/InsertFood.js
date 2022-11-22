import React, {Fragment, useState} from "react";

const InsertFood = () => {

    const [description, setDescription] = useState("Add Food Here...");

    const onSubmitForm = async e () => {
        e.preventDefault();
        try {
            const body = {description};
            const response = fetch("http://localhost:3000/food", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className = "text-center mt-5">blahh Food</h1>
            <form className = "d-flex mt-5">
                <input type = "text" className = "form-control" value = {description}
                onChange = {e => setDescription(e.target.value)}/>
                <button className = "btn btn-success">Insert</button>
            </form>
    </Fragment>
    );
    
};

export default InsertFood;
