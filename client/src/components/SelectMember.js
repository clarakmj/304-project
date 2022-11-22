import React, { Fragment, useState } from 'react';

const SelectMember = () => {

    const [description, setDescription] = useState("Select a member in a particular city");

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = {description};
            const response = fetch("http://localhost:3000/food", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
        });

        console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Select Member</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => 
                setDescription(e.target.value)}/>
                <button className="btn btn-success">Select Member</button>
            </form>
        </Fragment>
    )
}

export  default SelectMember;