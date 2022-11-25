import React, {Fragment, useEffect, useState} from "react";
import UpdateFood from "./UpdateFood";

const ListFood = () => {

  const [foods, setFood] = useState([]);

  const deleteFood = async fid => {
    try {
      const deleteFood = await fetch(`http://localhost:3000/food/${fid}`, {
        method: "DELETE"
      });

      setFood(foods.filter(food => food.fid !== fid));

    } catch (err) {
      console.error(err.message);
    }
  }

    const getFood = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/food")
            const jsonData = await response.json();

            setFood(jsonData);
        } catch (err) {
            console.log("oh no");
        }
    }

    useEffect(() => {
        getFood();
    }, []);


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
      {foods.map(food => (
        <tr key = {food.fid}>
          <td>{food.fid}</td>
          <td>{food.price}</td>
          <td>{food.storenum}</td>
          <td>{food.branchnum}</td>
          <td>
            <UpdateFood food = {food}/>
          </td>
          <td>
            <button className = "btn btn-danger" onClick = {() => {
              deleteFood(food.fid)
            }}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
}

export default ListFood; 