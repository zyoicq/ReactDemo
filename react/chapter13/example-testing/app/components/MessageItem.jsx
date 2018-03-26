import React from 'react';
import MessageStore from '../stores/MessageStore';

export default class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggleRead = this.toggleRead.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  toggleRead(e) {
    e.preventDefault();
    const message = this.props.message;
    if (!message.hasRead) {
      MessageStore.toggleRead(this.props.message.id);
      MessageStore.emitChange();
    }
  }

  deleteMessage(e) {
    e.preventDefault();
    MessageStore.deleteMessage(this.props.message.id);
    MessageStore.emitChange();
  }

  render() {
    const message = this.props.message;
    const messageReadClass = message.hasRead ? 'message-read' : '';
    let readText = message.hasRead && '(已读)';
    return (
      <li>
        <span className={`message-content ${messageReadClass}`} onClick={this.toggleRead}>{message.content}{readText}</span>
        <button className="delete" onClick={this.deleteMessage}> x </button>
      </li>
    );
  }
}
