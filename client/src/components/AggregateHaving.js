import React, {Fragment, useEffect, useState} from "react";

const AggregateHaving = () => {

    const [foodItem, setItem] = useState([]);

    const getItem = async () => {
        try {
            const response = await fetch("http://localhost:3000/fooditem")
            const receivedJson = await response.json();

            setItem(receivedJson);
            // console.log(sum)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getItem();
    },[]);

    return <Fragment>
        <h1 className = "text-center mt-5">Most Expensive Food Item Per Store</h1>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Store Number</th>
        <th>Item ID</th>
        <th>Item Price</th>
      </tr>
    </thead>
    <tbody>
      {foodItem.map(food => (
        <tr key = {food.storenum}>
          <td>{food.storenum}</td>
          <td>{food.max.toFixed(1)}</td>
          <td>{food.max.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
}

export default AggregateHaving;