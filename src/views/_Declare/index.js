import React, { useState } from "react";
import './index.scss'
import { HashRouter, Link } from "react-router-dom";
import {Basic, Advanced, Test, Example} from '../../routers/index'

function Declare () {
  const [stick, setStick] = useState(true)
  const routers = [
    { url: 'router-usage', txt: 'Router路由使用'},
    { url: 'hooks', txt: 'Hooks使用'},
    { url: 'comp-desc', txt: '组件定义与使用'},
    { url: 'react-lazy', txt: 'react-lazy'}
  ]
  const changeHash = (url) => {
    if (window.location.hash !== url) {
      window.location.hash = '#/' + url
      setStick(true)
    }
  }
  const createLink = (ary) => {
    return (<div>
      {
        ary.map(o => (
          <div>
            <Link key={o.path} to={o.path}>{o.txt}</Link>
          </div>
        ))
      }
    </div>)
  }
  return (<div className={['declare', stick ? 'declare-stick' : ''].join(' ')}>
    {/*<div className={['stick', stick ? 'stick-opacity' : null].join(' ')} onClick={() => { setStick(!stick) }} />*/}
    <div>

    </div>
    <div>
      <HashRouter>
        <h4>基础</h4>
        { createLink(Basic) }
        <h4>高级</h4>
        <div>
          {
            Advanced.map(o => (
              <div>
                <Link key={o.path} to={o.path}>{o.txt}</Link>
              </div>
            ))
          }
        </div>
        <h4>测试</h4>
        { createLink(Test) }
        <h4>实例</h4>
        { createLink(Example) }
      </HashRouter>

    </div>

  </div>)
}

export default Declare
