import { useState } from 'react';
import './App.css';

function Nav(props){
  const navItems = props.topics.map((item) => (
    <li key={item.id}>
      <a href={`/read/${item.id}`} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(item.id);
      }}>{item.title}</a>
    </li>
  ));
  return <nav>
  <ol>
  {navItems}
  </ol>
</nav>
}
function Article(props){
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}
function Header(props){
  console.log('Header props',props);
  return <header>
    <h1>
      <a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a>
    </h1>
  </header>
}
function App() {
  const [mode,setMode] = useState('WELCOME');
  const [id,setId] = useState(null);
  const topics = [
    {id:1, title: 'html', body :'html is ...'},  
    {id:2, title: 'css', body :'css is ...'},  
    {id:3, title: 'javascript', body :'javascript is ...'},  
  ]
  let content;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if(mode === 'READ'){
    const topic = topics.find(topic=>{
      return topic.id===id;
    })
    console.log('topic',topic)
    content = <Article title={topic.title} body={topic.body}></Article>;
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
      <a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}

export default App;
