import React from 'react'
import ReactDOM from 'react-dom'

//import logo from './logo.svg';
//import './App.css';

const App = () => (
	<div>
		<p>Hello world!</p>
	</div>
)

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
//export default App;



/*
{
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"				//??
          rel="noopener noreferrer" 	//??
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
