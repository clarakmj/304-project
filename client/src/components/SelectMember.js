import React, { Fragment, useState, useEffect } from 'react';

const SelectMember = () => {

    const [branchnum, setBranchNum] = useState("Branch Number");
    const [memid, setMemID] = useState("Member ID");

    const [members, setMembers] = useState([]);

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = {branchnum, memid};
            const response = await fetch("http://localhost:3000/member", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
        });
        window.location= "/";
        //console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getMembers = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/member", {method: "GET"})
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
            <h1 className="text-center mt-5">Find Members</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control" value={branchnum} onChange={e => 
                setBranchNum(e.target.value)}/>
                <input type="text" className="form-control" value={memid} onChange={e => 
                setMemID(e.target.value)}/>
                <button className="btn btn-success">Search</button>
            </form>
            <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Member ID</th>
        <th>Phone #</th>
        <th>Street Address</th>
        <th>Name</th>
        <th>Branch Number</th>
      </tr>
    </thead>
    <tbody>
      {}
      {members.map(members => (
        <tr key = {members.memid}>
          <td>{members.memid}</td>
          <td>{members.phonenum}</td>
          <td>{members.streetaddr}</td>
          <td>{members.memname}</td>
          <td>{members.branchnum}</td>
        </tr>
      ))}
    </tbody>
  </table>
        </Fragment>
    )
}

export  default SelectMember;