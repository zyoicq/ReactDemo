import React from 'react';

var App = React.createClass({
  propTypes: {
      book: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {book: "React前端技术与工程实践"};
  },

  handleClick: function(event) {
    event.preventDefault();
    alert("received event: " + event);
  },

  render: function() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        我和《{this.props.book}》有个约会
      </div>
    )
  }
});

export default App;
