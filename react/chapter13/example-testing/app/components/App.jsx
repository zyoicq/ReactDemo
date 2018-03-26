import React from 'react';
import AddMessage from './AddMessage';
import MessageList from './MessageList';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>消息列表</h2>
        <MessageList/>
        <AddMessage/>
      </div>
    );
  }
}
