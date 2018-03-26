import React from 'react';

const contextTypes = {
  book: React.PropTypes.string
}

const defaultProps = {
  book:"React前端技术与工程实践"
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    //this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    event.preventDefault();
    alert("received event: " + event);
  }
  
  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        我和《{this.props.book}》有个约会
      </div>
    );
  }
}

App.contextTypes = contextTypes;
App.defaultProps = defaultProps;

export default App;
