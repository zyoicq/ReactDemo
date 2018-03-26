import React from 'react';
import {Link, IndexLink} from 'react-router';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <div>
        <div id="nav">
          <ul>
            <li className="menu">
              <Link to="/route1">路由1</Link>
              <Link to="/route2">路由2</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
