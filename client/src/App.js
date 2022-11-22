import React, { Fragment } from 'react';
import './App.css';

// components 
import InsertFood from './components/InsertFood';
import SelectMember from './components/SelectMember';

function App() {
  return (
  <Fragment>
    <div className="container">
      <SelectMember />
    </div>
    </Fragment>);
}

export default App;
