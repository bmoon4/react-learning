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
      <a id={t.id} href={'/read/' + t.id} onClick={(event)=>{
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
function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={event =>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
       <p><input type="text" name="title" placeholder="title"></input></p>
       <p> <textarea name="body" placeholder='body'></textarea></p>
       <p><input type="submit" value="create"></input></p>
      </form>
    </article>
  )
}

function Update(props){
  const[title, setTitle] = useState(props.title);
  const[body, setBody] = useState(props.body);
  return(
    <article>
    <h2>Update</h2>
    <form onSubmit={event =>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
     <p><input type="text" name="title" placeholder="title" value={title} onChange={event =>{
        setTitle(event.target.value);
     }}></input></p>
     <p> <textarea name="body" placeholder='body' value={body} onChange={event =>{
        setBody(event.target.value);
     }}></textarea></p>
     <p><input type="submit" value="update"></input></p>
    </form>
  </article>
  )
}

function App() {
  const [mode, setMode]= useState('WELCOME');
  const [id, setId]= useState(null);
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is...'},
    {id: 2, title: 'css', body: 'css is...'},
    {id: 3, title: 'javascript', body: 'javascript is...'}
  ]);
  let content = null;
  let contextControl = null;

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
    contextControl =<li><a href={'/update/'+id} onClick={ event =>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
  }else if(mode === 'CREATE'){
   content = <Create onCreate={(title, body)=>{
      const newTopics = [...topics];
      newTopics.push({id: newTopics.length+1, title, body});
      setTopics(newTopics);
      setMode('READ');
      setId(newTopics.length);
   }}/>
  }
  else if(mode === 'UPDATE'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === Number(id)){
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics];
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === Number(id)){
          newTopics[i].title = title;
          newTopics[i].body = body;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
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
      <ul>
        <li><a href="/create" onClick={(event)=>{
          event.preventDefault();
          setMode("CREATE");
        } }>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
