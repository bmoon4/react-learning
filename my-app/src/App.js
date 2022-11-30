import React from 'react';
import { useState } from 'react';

function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }} >{props.title}</a>
      </h1>
    </header>
  )
}

function Nav(props){
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id}href={'/read/' + t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}>{t.title}</a>
      </li>)
  }
  return (
    <nav>
      <ul>
        {lis}
      </ul>
    </nav>
  )
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function App() {
  const [mode, setMode]= useState('WELCOME');
  const [id, setId]= useState(null);
  const topics = [
    {id: 1, title: 'html', body: 'html is...'},
    {id: 2, title: 'css', body: 'css is...'},
    {id: 3, title: 'javascript', body: 'javascript is...'}
  ]
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, React!!" />
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === Number(id)){
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Article title={title} body={body} />
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode("WELCOME");
      }} />
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode("READ");
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
