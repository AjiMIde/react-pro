import './App.scss';
import Router from '../../routers'
import Declare from "@views/_Declare";
import _ from 'lodash'

setTimeout(() => {
  // 开始
  window.onresize = (() => {
    return _.debounce(() => {
      console.log('oooo resize')
    }, 500)
  })()
}, 1000)


function App() {


  return (
    <div className="App">
      <div className={'aji-test'} style={{width: 4, height: 4, background: 'red', position: 'absolute', left: 4, top: 4}}></div>
      <div className="app-left">
        <Declare/>
      </div>
      <div className="app-center">
        <div className={'App-router-container markdown-body'}>
          <Router/>
        </div>
      </div>


    </div>
  );
}

export default App;
