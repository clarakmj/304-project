import React, {Fragment} from "react";
import './App.css';

// components 
import InsertFood from './components/InsertFood';

function App() {
  return (
    <Fragment>
      <div className = "container">
      <InsertFood />
      </div>
    </Fragment>
  );
}

export default App;
