import React from 'react'
import { Link } from 'react-router-dom'

export default class RouterUsage extends React.Component {
  componentDidMount () {
    console.log(this.props)
  }

  render() {
    return (<div className={'router-usage'}>
      <li>这个项目的大部分页面都是使用router管理的，直接参考<code>src/routers</code>即可了解路由的使用</li>
      <li>注意<code>HashRouter, Switch, Route</code>的使用</li>
      <li><b>Route</b>有好几种包裹模式，请看 <code>src/routers</code>内容</li>

      <li>可用 <code>a, Link, NavLink</code>来制作导航，区别请看页面2</li>
      <a href="#/router-comp2">页面2</a>

      <li>编辑式导航可以使用<code>history.push/goBack/...</code>等，注意history参数的注入<code>（src/routers/index.js）</code></li>
      <a href="#/router-comp3">页面3</a>

      <li>和许多路由的插件的带参方式一样，可以使用<code>path/:param, path?query=, [path: '', query: []](把[]换成花括号)</code></li>
      <a href="#/router-comp4/Lucy?sex=girl">页面4</a>
      <Link to={{pathname: '/router-comp4/Curry', state: { name: 'Luck', sex: 'girl', age: 18} }}>页面4</Link>

      <li>嵌套路由在路由插件中必不可少,<code>react-router-dom</code>提供的嵌套路由需要耦合到父页面去</li>
      <Link to='router-comp5'>页面5</Link>

    </div>)
  }
}
