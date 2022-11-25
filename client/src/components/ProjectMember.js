import React, { Fragment, useState, useEffect } from 'react';

const ProjectMember = () => {

    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/membership", {method: "GET"})
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
            <h1 className="text-center mt-5">Expiry Dates</h1>
            <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Member ID</th>
        <th>Phone #</th>
        <th>Expiry Date</th>
      </tr>
    </thead>
    <tbody>
      {}
      {members.map(members => (
        <tr key = {members.memid}>
          <td>{members.memid}</td>
          <td>{members.member}</td>
          <td>{members.expirydate}</td>
        </tr>
      ))}
    </tbody>
  </table>
        </Fragment>
    )
}

export  default ProjectMember;