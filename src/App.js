import React from 'react';
import UserInput from './components/UserInput';
import ChangeMessage from './components/ChangeMessage';
import DisplayMessages from './components/DisplayMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      name: '',
      text: '',
      showInput: false,
      showChangeMessage: false,
      editIndex: null
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  onNewEntry = () => {
    this.setState({showInput: true})
  }

  onEditMessage = (index, e) => {
    this.setState({editIndex: index})
    this.setState({showChangeMessage: true})
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
          }]}), 
          () => (
            this.setState({
              name: '',
              text: ''
            })
          ));
      this.onCancel();
      // TODO store in database
    }
  }

  handleEditInput = () => {
    if(this.state.text !== ''){
      console.log(this.state.editIndex)
      const array = [...this.state.messages];
      array[this.state.editIndex].text = this.state.text;
      this.setState({messages: array}, 
        () => (
          this.setState({
            text: ''
          })
        ));
      this.onCancel();
      // TODO update database
    }
  }

  handleDeleteMessage = (position, e) => {
    const array = [...this.state.messages];
    array.splice(position, 1);
    this.setState({messages: array});
    //TODO delete from database
  }

  onCancel = () => {
    this.setState({showInput: false});
    this.setState({showChangeMessage: false})
  }

  render() {
    return (
      <div className="App">
        {this.state.showInput ? <UserInput onNameChange={this.onNameChange} onTextChange={this.onTextChange} onSubmitInput={this.onSubmitInput} onCancel={this.onCancel} /> : null}
        {this.state.showChangeMessage ? <ChangeMessage onTextChange={this.onTextChange} handleEditInput={this.handleEditInput} onCancel={this.onCancel} /> : null}
        <div className="contentWrapper">
          <h1>Guestbook</h1>
          <button id='newEntry' onClick={this.onNewEntry}><FontAwesomeIcon icon={faPlus} /> New Entry</button>
          <DisplayMessages messages={this.state.messages} editMessage={this.onEditMessage} handleDeleteMessage={this.handleDeleteMessage} />
          
        </div>
      </div>
    );
  }
}

export default App;
