import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Widget from './components/index.jsx';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path="/" component={Widget}/>
          </div>
        </Router>
    );
  }
}
export default App;
