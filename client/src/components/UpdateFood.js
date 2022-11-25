import React, {Fragment, useEffect, useState} from "react";

const UpdateFood = ({food}) => {
    const [price, setPrice] = useState(food.price)

    const updatePrice = async e => {
        e.preventDefault();
        try {
            const body = {price};
            const response = await fetch(`http://localhost:3000/food/${food.fid}`, {
                method: "PUT", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            console.log(response)
            window.location= "/";
            
        } catch (err) {
            console.error(err.message);
        }
    }

return <Fragment>
<button type="button" class="btn btn-warning" data-toggle="modal" data-target= {`#id${food.price}`}>
  Edit Food
</button>

<div class="modal" id = {`id${food.price}`}>
  <div class="modal-dialog">  
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Update Food Price</h4>
        <button type="button" class="close" data-dismiss="modal">&times;
        </button>
      </div>

      <div class="modal-body">
        <input type = "text" className = "form-control" value = {price} 
        onChange = {e => setPrice(e.target.value)}
        />
      </div>
 
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updatePrice(e)}>Edit</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
    </Fragment>;
}

export default UpdateFood;