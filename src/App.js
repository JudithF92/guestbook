import React from 'react';
import { Message } from './components/Message';
import UserInput from './components/UserInput';
import DisplayMessages from './components/DisplayMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      showInput: false,
      name: '',
      text: ''
    }
  }

  onNewEntry = () => {
    this.setState({showInput: true})
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onTextChange = (event) => {
    this.setState({text: event.target.value})
  }

  onSubmitInput = () => {
    if(this.state.name !== '' && this.state.text !== ''){
      this.setState(prevState => ({
        messages: [...prevState.messages, 
          {
            id: 0,
            name: this.state.name,
            text: this.state.text
          }]}));
      this.onCancel();
    }
  }

  onCancel = () => {
    this.setState({showInput: false})
  }

  render() {
    return (
      <div className="App">
        {this.state.showInput ? <UserInput onNameChange={this.onNameChange} onTextChange={this.onTextChange} onSubmitInput={this.onSubmitInput} onCancel={this.onCancel} /> : null}
        <div className="contentWrapper">
          <h1>Guestbook</h1>
          <button id='newEntry' onClick={this.onNewEntry}><FontAwesomeIcon icon={faPlus} /> New Entry</button>
          <DisplayMessages messages={this.state.messages} />
          
        </div>
      </div>
    );
  }
}

export default App;
