import React, {Fragment} from "react";

const InsertFood = () => {
    return (
        <Fragment>
            <h1 className = "text-center mt-5">blahh Food</h1>
            <form className = "d-flex mt-5">
                <input type = "text" className = "form-control" />
                <button className = "btn btn-success">Insert</button>
            </form>
    </Fragment>
    );
    
};

export default InsertFood;
