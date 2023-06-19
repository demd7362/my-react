import { useState } from 'react';
import './App.css';

function Nav(props) {
  const navItems = props.topics.map((item) => (
    <li key={item.id}>
      <a href={`/read/${item.id}`} onClick={(event) => {
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
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props) {
  console.log('Header props', props);
  return <header>
    <h1>
      <a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a>
    </h1>
  </header>
}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <div><input type="text" name="title" placeholder="title"></input></div>
      <div><textarea name="body" placeholder="body"></textarea></div>
      <div><input type="submit" value="Create"></input></div>
    </form>
  </article>
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <div><input type="text" name="title" placeholder="title" value={title} onChange={event => {
        setTitle(event.target.value);
      }}></input></div>
      <div><textarea name="body" placeholder="body" value={body} onChange={event => {
        setBody(event.target.value);
      }}></textarea></div>
      <div><input type="submit" value="Update"></input></div>
    </form>
  </article>
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);
  const [nextId, setNextId] = useState(4);
  let content;
  let contextControl;
  const adjustMode = {
    WELCOME() {
      content = <Article title="Welcome" body="Hello, WEB"></Article>
    },
    READ() {
      const topic = topics.find(topic => {
        return topic.id === id;
      })
      content = <Article title={topic.title} body={topic.body}></Article>
      contextControl = <><li><a href={"/update/" + topic.id} onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
        <li>
          <input type="button" value="Delete" onClick={()=>{
            const newTopics = topics.filter(topic=>{
              return topic.id !== id;
            })
            setTopics(newTopics);
            setMode('WELCOME');
          }}></input></li></>
    },
    CREATE() {
      content = <Create onCreate={(title, body) => {
        const newTopic = {
          id: nextId,
          title: title,
          body: body
        }
        setTopics([...topics, newTopic]);
        setMode('READ');
        setId(nextId);
        setNextId(nextId + 1);

      }
      }></Create>
    },
    UPDATE() {
      const topic = topics.find(topic => {
        return topic.id === id;
      })
      content = <Update title={topic.title} body={topic.body} onUpdate={(title, body) => {
        topic.title = title;
        topic.body = body;
        setMode('READ');
      }}></Update>
    }
  }
  adjustMode[mode]();

  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
