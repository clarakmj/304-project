import React, {Fragment, useEffect, useState} from "react";

const AggregateSumFood = () => {

    const [sum, setSum] = useState([]);

    const getSum = async () => {
        try {
            const response = await fetch("http://localhost:3000/foodsum")
            const receivedJson = await response.json();

            setSum(receivedJson);
            // console.log(sum)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getSum();
    },[]);

    console.log(sum)
    console.log(typeof sum);

    return <Fragment>
        <h1 className = "text-center mt-5">Sum of all food prices grouped by Store Number</h1>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Store Number</th>
        <th>Sum of Price</th>
      </tr>
    </thead>
    <tbody>
      {sum.map(food => (
        <tr key = {food.storenum}>
          <td>{food.storenum}</td>
          <td>{food.sum.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
}

export default AggregateSumFood;