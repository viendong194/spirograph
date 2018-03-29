import React, { Component } from 'react';
import Canvas from './canvas'
class App extends Component {
  componentDidMount(){
    new Canvas()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Basic Canvas</h1>
        </header>
        <div id="canvas-container"></div>
      </div>
    );
  }
}

export default App;
