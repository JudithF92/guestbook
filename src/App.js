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
      id: null,
      showCreateMessageForm: false,
      showChangeMessageForm: false,
      showConfirmDeleteMessage: false,
      showDisplayInformation: false,
      displayInformation: '',     
      storeMessageStatus: '',
      currentFunction: '',
      messageIndex: null
    }
  }

  componentDidMount() {
    fetch('https://safe-brushlands-34997.herokuapp.com/getmessages')
      .then(response => response.json())
      .then(data => {
        if (data !== 'unable to get messages')
          this.setState({messages: data})
        else {
          this.setState({displayInformation: 'Backend error: Unable to get messages'});
          this.setState({showDisplayInformation: true});
        }})
      .catch(()=>{
        this.setState({displayInformation: 'Error: Unable to get messages'});
        this.setState({showDisplayInformation: true});
      })
  }

  onNewEntry = () => {
    this.setState({showCreateMessageForm: true})
  }

  onEditMessage = (id) => {
    this.setState({id: id})
    this.setState({showChangeMessageForm: true})
  }

  onDeleteMessage = (id) => {
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

  onTryAgain = () => {
    if (this.state.currentFunction === 'submit') {
      const array = this.state.messages;
      array.splice(0,1);
      this.setState({messages: array});
      this.handleSubmitInput();
    } else if (this.state.currentFunction === 'edit'){
      this.handleEditMessage();
    }
  }

  handleSubmitInput = () => {
    if(this.state.name !== '' && this.state.text !== ''){
      this.setState({messageIndex: 0});
      const message = { 
        name: this.state.name,
        text: this.state.text,
        date: new Date()}
      this.setState(prevState => ({
        messages: [message, ...prevState.messages]}), 
          () => (
            this.setState({storeMessageStatus: 'sending'}
            )))
      fetch('https://safe-brushlands-34997.herokuapp.com/createmessage', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          text: this.state.text
        })})
        .then(response => response.json())
        .then(message => {
          if (message !== 'unable to store message'){
            const array = this.state.messages;
            array.splice(0,1);
            // this.setState({messages: array});
            this.setState({            
              messages: [message, ...array]}, 
                () => (
                  this.setState({
                    name: '',
                    text: ''
                  })))
            this.setState({storeMessageStatus: 'succeeded'});
            setTimeout(function(){
              this.setState({storeMessageStatus: ''})
            }.bind(this), 3000);
          } else {
            this.setState({currentFunction: 'submit'});
            this.setState({storeMessageStatus: 'failed'});
          }
        })
        .catch(()=>{
          this.setState({currentFunction: 'submit'})
          this.setState({storeMessageStatus: 'failed'});
        })
      
      this.onCancel();
    } else {
      this.setState({displayInformation: 'Please enter a name and a message'});
      this.setState({showDisplayInformation: true});
    }
  }

  handleEditMessage = () => {
    if(this.state.text !== ''){
      const length = this.state.messages.length;
      let indexEdit;
      for(let i = 0; i<length; i++){
        if(this.state.id === this.state.messages[i].id){
          indexEdit = i;
          break;
        }
      }
      this.setState({messageIndex: indexEdit}, 
        () => (
          this.setState({storeMessageStatus: 'sending'}
          )));
      const array=this.state.messages;
      array[indexEdit] = {...array[indexEdit], text: this.state.text, edited: new Date()};
      this.setState({messages: array});
      fetch('https://safe-brushlands-34997.herokuapp.com/updatemessage', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.id,
          text: this.state.text
        })})
        .then(response => response.json())
        .then(messages => {
          if (messages !== 'unable to edit message') {
            this.setState({messages: messages}, 
            () => (
              this.setState({
                text: ''
              })
            ))
            this.setState({storeMessageStatus: 'succeeded'});
            setTimeout(function(){
              this.setState({storeMessageStatus: ''})
            }.bind(this), 3000);
          } else {
            this.setState({currentFunction: 'edit'})
            this.setState({storeMessageStatus: 'failed'});
          }
        })
        .catch(()=>{
          this.setState({currentFunction: 'edit'})
          this.setState({storeMessageStatus: 'failed'});
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
      .then(messages => {
        if(messages !== 'unable to delete message') 
          this.setState({ messages: messages})
          else {
            this.setState({displayInformation: 'Backend error: Unable to delete messages'});
            this.setState({showDisplayInformation: true});
          }
      })
      .catch(() => {
        this.setState({displayInformation: 'Error: Message could not be deleted'});
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
          {this.state.messages.length ? <MessageList messages={this.state.messages} onEditMessage={this.onEditMessage} onDeleteMessage={this.onDeleteMessage} onStoreMessageStatus={this.state.storeMessageStatus} onTryAgain={this.onTryAgain} messageIndex={this.state.messageIndex} /> : <h2>Loading Messages...</h2>}
        </div>
      </div>
    );
  }
}

export default App;
