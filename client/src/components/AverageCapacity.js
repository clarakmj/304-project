import React, {Fragment, useEffect, useState} from "react";

const AverageCapacity = () => {

    const [city, setCity] = useState([]);

    const getItem = async () => {
        try {
            const response = await fetch("http://localhost:3000/mingym")
            const receivedJson = await response.json();

            setCity(receivedJson);
            // console.log(sum)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getItem();
    },[]);

    return <Fragment>
        <h1 className = "text-center mt-5">Minimum Gym Capacity in a City</h1>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>City</th>
        <th>Minimum Average Capacity</th>
      </tr>
    </thead>
    <tbody>
      {city.map(gym => (
        <tr key = {gym.city}>
          <td>{gym.city}</td>
          <td>{gym.cap}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
}

export default AverageCapacity;