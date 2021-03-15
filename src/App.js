import logo from './logo.svg';
import './App.scss';
import Menu from './components/Menu/menu.js'
import Router from './routers/index'
import { useState } from 'React'
import { Link, HashRouter } from 'react-router-dom'

function Declare () {
  const [stick, setStick] = useState(true)
  const routers = [
    { url: 'router-usage', txt: 'Router路由使用'},
    { url: 'hooks', txt: 'Hooks使用'},
  ]
  const changeHash = (url) => {
    console.log(url)
    if (window.location.hash !== url) {
      window.location.hash = '#/' + url
      setStick(true)
    }
  }
  return (<div className={['declare', stick ? 'declare-stick' : ''].join(' ')}>
    <div className={['stick', stick ? 'stick-opacity' : null].join(' ')} onClick={() => { setStick(!stick) }} />
    <div>
      这是一个React“大杂烩”，包含了很多React的基本使用、高级使用、相关技术、相关丁配置等，点击下面的菜单查看相关的，
      你想要看查看的内容
      <h3>此外，你应该注意的是，基本上所有内容的细节都可以在react-books中找到，你可以看作这个项目是react-books的拓展，这完全ok</h3>
    </div>
    <div>
      <ul>
        <li>xx</li>
        <li>xx</li>
        <li>xx</li>
      </ul>
      <h3>高级</h3>
      <HashRouter>
        <ul>
          {
            routers.map(o => (
              <li key={o.url} onClick={changeHash.bind(this, o.url)}>{o.txt}</li>
            ))
          }
        </ul>
      </HashRouter>

    </div>

  </div>)
}

function App() {
  return (
    <div className="App">

      <div className={'App-router-container'}>
        <Router/>
      </div>

      <Declare/>

      <Menu/>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
