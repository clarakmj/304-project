import React, { Fragment } from 'react';

const SelectMember = () => {
    return (
        <Fragment>
            <h1 className="text-center mt-5">Select Member</h1>
            <form className="d-flex">
                <input type="text" className="form-control" />
                <button className="btn btn-success">Select Member</button>
            </form>
        </Fragment>
    )
}

export  default SelectMember;