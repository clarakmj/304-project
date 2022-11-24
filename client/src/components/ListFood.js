import React, {Fragment, useEffect, useState} from "react";

const ListFood = () => {

    const getFood = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/food")
            const jsonData = await response.json();

            console.log(jsonData);
        } catch (err) {
            console.log("oh no");
        }
    }

    useEffect(() => {
        getFood();
    })

    return <Fragment>
         <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Food ID #</th>
        <th>Price</th>
        <th>Store Number</th>
        <th>Branch Number</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      
    </tbody>
  </table>
    </Fragment>
}

export default ListFood;