import {EventEmitter} from 'events';
import assign from 'object-assign';

const MessageStore = assign({}, EventEmitter.prototype, {
  items: {
    messages: [
      { id: 0, content: '第一条消息', hasRead: false },
      { id: 1, content: '第二条消息', hasRead: false },
      { id: 2, content: '第三条消息', hasRead: false },
    ]
  },

  nextId: 3,

  getAll: function getAll() {
    return this.items;
  },

  emitChange: function emitChange() {
    this.emit('change');
  },

  addChangeListener: function addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  sendMessage: function sendMessage(message) {
    const messages = this.items.messages;
    if (!messages || typeof this.items.messages.length !== 'number') {
      this.items.messages = [];
    }
    message.id = this.nextId++;
    message.hasRead = false;
    this.items.messages.push(message);
  },

  toggleRead: function toggleRead(id) {
    this.items.messages = this.items.messages.map(message => {
      if (message.id === id) {
        message.hasRead = !message.hasRead;
      }
      return message;
    });
  },

  deleteMessage: function deleteMessage(id) {
    this.items.messages = this.items.messages.filter((message) => message.id !== id);
  }
});

export default MessageStore;
