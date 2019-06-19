import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json));
  }

  render() {
    return (
      <div className="App">
        Hello React!!!!!!
      </div>
    );
  }
}

export default App;
