import React, {Fragment} from "react";
import './App.css';

// components 
import InsertFood from './components/InsertFood';
import SelectMember from './components/SelectMember';
import ListFood from "./components/ListFood";
import AggregateSumFood from "./components/AggregateSumFood";
import AggregateHaving from "./components/AggregateHaving";
import ProjectMember from "./components/ProjectMember";



function App() {
  return (
  <Fragment>
    <div className="container">
      <InsertFood />
      <h1 className = "text-center mt-5">Edit Price of Food Items</h1>
      <ListFood />
      <AggregateSumFood />
    </div>
    <div className="container">
      <AggregateHaving />
    </div>
    <div className="container">
      <SelectMember />
    </div>
    <div className="container">
      <ProjectMember />
    </div>
    </Fragment>);
}

export default App;
