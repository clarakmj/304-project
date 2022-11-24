import React, {Fragment} from "react";
import './App.css';

// components 
import InsertFood from './components/InsertFood';
import SelectMember from './components/SelectMember';
// import ListFood from "./components/ListFood";

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
    </Fragment>);
}

export default App;
