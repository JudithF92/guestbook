import React from 'react';
import CreateMessageForm from './components/CreateMessageForm';
import ChangeMessageForm from './components/ChangeMessageForm';
import ConfirmDeleteMessage from './components/ConfirmDeleteMessage';
import DisplayInformation from './components/DisplayInformation';
import MessageList from './components/MessageList';
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
      showCreateMessageForm: false,
      showChangeMessageForm: false,
      showConfirmDeleteMessage: false,
      showDisplayInformation: false,
      displayInformation: '',
      
      id: null
    }
  }

  componentDidMount() {
    fetch('https://safe-brushlands-34997.herokuapp.com/getmessages')
      .then(response => response.json())
      .then(data => {
        if (data !== "unable to get messages")
          this.setState({messages: data})})
      .catch(()=>{
        this.setState({displayInformation: 'Backend error: Unable to get messages'});
        this.setState({showDisplayInformation: true});
      })
  }

  onNewEntry = () => {
    this.setState({showCreateMessageForm: true})
  }

  onEditMessage = (id, e) => {
    this.setState({id: id})
    this.setState({showChangeMessageForm: true})
  }

  onDeleteMessage = (id, e) => {
    this.setState({id: id})
    this.setState({showConfirmDeleteMessage: true})
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onTextChange = (event) => {
    this.setState({text: event.target.value})
  }

  onCancel = () => {
    this.setState({showCreateMessageForm: false});
    this.setState({showChangeMessageForm: false});
    this.setState({showConfirmDeleteMessage: false});
  }

  onCancelInformationWindow = () => {
    this.setState({showDisplayInformation: false});
  }

  handleSubmitInput = () => {
    if(this.state.name !== '' && this.state.text !== ''){
      fetch('https://safe-brushlands-34997.herokuapp.com/postmessage', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          text: this.state.text
        })})
        .then(response => response.json())
        .then(message => {
          this.setState(prevState => ({
            messages: [message, ...prevState.messages]}), 
              () => (
                this.setState({
                  name: '',
                  text: ''
                })))
          this.setState({displayInformation: 'Your message is now displayed'});
          this.setState({showDisplayInformation: true});
        })
        .catch(()=>{
          this.setState({displayInformation: 'Backend error: Message could not be submitted'});
          this.setState({showDisplayInformation: true});
        })
      
      this.onCancel();
    } else {
      this.setState({displayInformation: 'Please enter a name and a message'});
      this.setState({showDisplayInformation: true});
    }
  }

  handleEditMessage = () => {
    if(this.state.text !== ''){
      fetch('https://safe-brushlands-34997.herokuapp.com/changemessage', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.id,
          text: this.state.text
        })})
        .then(response => response.json())
        .then(messages => {
          this.setState({messages: messages}, 
          () => (
            this.setState({
              text: ''
            })
          ))
          this.setState({displayInformation: 'Your message was edited'});
          this.setState({showDisplayInformation: true});
        })
        .catch(()=>{
          this.setState({displayInformation: 'Backend error: Message could not be edited'});
          this.setState({showDisplayInformation: true});
        })

      this.onCancel();
    } else {
      this.setState({displayInformation: 'Please enter a message'})
      this.setState({showDisplayInformation: true})
    }
  }

  handleDeleteMessage = () => {
    fetch('https://safe-brushlands-34997.herokuapp.com/deletemessage', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.id
      })})
      .then(response => response.json())
      .then(messages => this.setState({ messages: messages}))
      .catch(() => {
        this.setState({displayInformation: 'Backend error: Message could not be deleted'});
        this.setState({showDisplayInformation: true});
      })   
      this.onCancel();
  }

  render() {
    return (
      <div className="App">
        {this.state.showDisplayInformation ? <DisplayInformation displayInformation={this.state.displayInformation} onCancel={this.onCancelInformationWindow} /> : null} 
        {this.state.showConfirmDeleteMessage ? <ConfirmDeleteMessage onDeleteMessage={this.handleDeleteMessage} onCancel={this.onCancel} /> : null}
        {this.state.showCreateMessageForm ? <CreateMessageForm onNameChange={this.onNameChange} onTextChange={this.onTextChange} onSubmitInput={this.handleSubmitInput} onCancel={this.onCancel} /> : null}
        {this.state.showChangeMessageForm ? <ChangeMessageForm onTextChange={this.onTextChange} onEditMessage={this.handleEditMessage} onCancel={this.onCancel} /> : null}
        <div className="contentWrapper">
          <h1>Guestbook</h1>
          <button id='newEntry' onClick={this.onNewEntry}><FontAwesomeIcon icon={faPlus} /> New Entry</button>
          {this.state.messages.length ? <MessageList messages={this.state.messages} onEditMessage={this.onEditMessage} onDeleteMessage={this.onDeleteMessage} /> : <h2>Loading Messages...</h2>}
        </div>
      </div>
    );
  }
}

export default App;
