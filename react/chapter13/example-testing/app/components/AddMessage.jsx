import React from 'react';
import MessageStore from '../stores/MessageStore';

export default class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage() {
    const newMessage = this.refs.messageInputer.value;
    if (newMessage) {
      MessageStore.sendMessage({ content: newMessage });
      MessageStore.emitChange();
      this.refs.messageInputer.value = '';
    }
  }

  render() {
    return (
      <div className="add-message">
        <input type="text" placeholder="输入消息文本" ref="messageInputer" />
        <button className="add-button" onClick={this.addMessage}>
          发送
        </button>
      </div>
    );
  }
}
