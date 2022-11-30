import React from 'react';
import logo from './logo.svg';
import './App.css';


function Header(props) {
  return (
    <header>{props.title}</header>
  )
}

function Button(props){
  return (
    <button onClick={props.onClick}>{props.button}</button>
  )
}

function App() {
  return (
    <div className="App">
      <Header title="This is props"/>
      <Button button="Click me" onClick={() => alert("Hello")}/>
    </div>
  );
}

export default App;
