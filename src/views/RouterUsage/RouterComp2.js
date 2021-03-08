import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class RouterComp2 extends React.Component {
  componentDidMount () {
  }

  render() {
    return (<div className={'router-comp'}>
      <div>
        这是演示页面2，下面是使用标签 a, Link, NavLink 的区别 todo
      </div>
      <div>
        <li>
          <a href="#/router-usage">a标签</a>
        </li>
        <li>
          <Link to='/router-usage'>Link标签</Link>
        </li>
        <li>
          <NavLink to='/router-usage' >NavList标签,自动添加active类，可添加activeClassName/activeStyle</NavLink>
        </li>
      </div>

    </div>)
  }
}
