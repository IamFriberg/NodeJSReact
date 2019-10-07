import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch('http://localhost:9000/testAPI')
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-Header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
        <div>
          <form action="http://localhost:9000/login" method="post">
            <div>
              <label>Username:</label>
              <input type="text" name="username"/>
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password"/>
            </div>
            <div>
              <input type="submit" value="Log In"/>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
