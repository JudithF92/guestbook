import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="contentWrapper">
         <h1>Guestbook</h1>
         <button id='newEntry'><FontAwesomeIcon icon={faPlus} /> New Entry</button>
        </div>
      </div>
    );
  }
}

export default App;
