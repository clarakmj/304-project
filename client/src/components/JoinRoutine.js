import React, {Fragment, useState} from "react";

const JoinRoutine = () => {

    const [routineType, setType] = useState();

    const [routine, setRoutine] = useState([]);

    const getItem = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/uses/${routineType}`)
            const receivedJson = await response.json();

            setRoutine(receivedJson);
            // console.log(sum)
        } catch (err) {
            console.error(err.message);
        }
    }

    return <Fragment>
        <h1 className="text-center mt-5">Find Routines</h1>
            <form className="d-flex mt-5" onSubmit={getItem}>
                <input type="text" placeholder='Routine Type' className="form-control" value={routineType} onChange={e => 
                setType(e.target.value)}/>
                <button className="btn btn-success">Search</button>
            </form>
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Trainer ID</th>
                    <th>Member ID</th>
                    <th>Equipment Serial Number</th>
                </tr>
            </thead>
            <tbody>
                {}
                {routine.map(routine => (
                    <tr key={routine.tid}>
                        <td>{routine.tid}</td>
                        <td>{routine.memid}</td>
                        <td>{routine.serialnum}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
}

export default JoinRoutine;