import React from 'react';
import MessageStore from '../stores/MessageStore';
import MessageItem from './MessageItem';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = MessageStore.getAll();
  }

  componentDidMount() {
    MessageStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    MessageStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(MessageStore.getAll());
  }

  render() {
    const messageItems = this.state.messages.map(message => {
      return (
        <MessageItem key={message.id} message={message}/>
      );
    });
    return (
      <ul>{messageItems}</ul>
    );
  }
}
