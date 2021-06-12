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
      id: null
    }
  }

  componentDidMount() {
    fetch('https://safe-brushlands-34997.herokuapp.com/getmessages')
      .then(response => response.json())
      .then(data => {
        if (data !== "unable to get messages")
          this.setState({messages: data})})
  }

  onNewEntry = () => {
    this.setState({showInput: true})
  }

  onEditMessage = (id, e) => {
    this.setState({id: id})
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
      fetch('https://safe-brushlands-34997.herokuapp.com/postmessage', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          text: this.state.text
        })})
        .then(response => response.json())
        .then(message => 
          this.setState(prevState => ({
            messages: [...prevState.messages, message]}), 
              () => (
                this.setState({
                  name: '',
                  text: ''
                }))
          ))
      this.onCancel();
    }
  }

  handleEditInput = () => {
    if(this.state.text !== ''){

      fetch('https://safe-brushlands-34997.herokuapp.com/changemessage', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.id,
          text: this.state.text
        })})
        .then(response => response.json())
        .then(messages => this.setState({messages: messages}, 
          () => (
            this.setState({
              text: ''
            })
          )))

      this.onCancel();
    }
  }

  handleDeleteMessage = (id, e) => {
    console.log(id);
    fetch('https://safe-brushlands-34997.herokuapp.com/deletemessage', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id
      })})
      .then(response => response.json())
      .then(messages => this.setState({ messages: messages}))   
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
          {this.state.messages.length ? <DisplayMessages messages={this.state.messages} editMessage={this.onEditMessage} handleDeleteMessage={this.handleDeleteMessage} /> : null}
        </div>
      </div>
    );
  }
}

export default App;
