import React, { Fragment, useState, useEffect } from 'react';

const GlobalMembers = () => {

    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/trainedall", {method: "GET"})
            const jsonData = await response.json();

            setMembers(jsonData);
        } catch (err) {
            console.log("rip I guess");
        }
    }

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center mt-5">Members Trained by All Trainers</h1>
            <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Member ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {}
      {members.map(members => (
        <tr key = {members.memid}>
          <td>{members.memid}</td>
          <td>{members.memname}</td>
        </tr>
      ))}
    </tbody>
  </table>
        </Fragment>
    )
}

export  default GlobalMembers;