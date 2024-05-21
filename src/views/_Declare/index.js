import React, { useState } from "react";
import './index.scss'
import { HashRouter, Link } from "react-router-dom";
import {Basic, Hooks, Advanced, Test, Example} from '../../routers/index'

function Declare () {
  const [stick, setStick] = useState(true)

  const createLink = (ary) => {
    return (<div className={'son-block'}>
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
    <div className={'left-menus'}>
      <HashRouter>
        <h4>基础</h4>
        { createLink(Basic) }
        <h4>Hooks</h4>
        { createLink(Hooks) }
        <h4>高级</h4>
        { createLink(Advanced) }
        <h4>测试</h4>
        { createLink(Test) }
        <h4>实例</h4>
        { createLink(Example) }
      </HashRouter>

    </div>

  </div>)
}

export default Declare
