import React, {Fragment} from "react";
import './App.css';

// components 
import InsertFood from './components/InsertFood';
import SelectMember from './components/SelectMember';
import ListFood from "./components/ListFood";
import ProjectMember from "./components/ProjectMember";
import AggregateHaving from "./components/AggregateHaving";

function App() {
  return (
  <Fragment>
    <div className="container">
      <InsertFood />
      <ListFood />
    </div>
    <div className="container">
      <SelectMember />
    </div>
    <div className="container">
      <ProjectMember />
    </div>
    <div className="container">
      <AggregateHaving />
    </div>
    </Fragment>);
}

export default App;
