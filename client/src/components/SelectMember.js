import React, { Fragment, useState} from 'react';

const SelectMember = () => {

    const [branchnum, setBranchNum] = useState();
    const [memid, setMemID] = useState();

    const [members, setMembers] = useState([]);

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = {branchnum, memid};
            const response = await fetch(`http://localhost:3000/member/${branchnum}/${memid}`, {
                method: "GET",});

            const receivedJson = await response.json();

            setMembers(receivedJson);
        //window.location= "/";
        console.log(response);
        console.log(members);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Find Members</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" placeholder='Branch Number' className="form-control" value={branchnum} onChange={e => 
                setBranchNum(e.target.value)}/>
                <input type="text" placeholder='Member ID' className="form-control" value={memid} onChange={e => 
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