import React from 'react'
import { Switch, Route, NavLink} from 'react-router-dom'

const PageA = () => (
  <div className={'page-a'}>page A</div>
)
const PageB = () => (
  <div className={'page-b'}>page B</div>
)

export default class RouterComp5 extends React.Component {
  componentDidMount () {
  }
  render() {
    const { match, location } = this.props
    console.log(this.props)
    return (<div className={'router-comp5'}>
      <div>
        这是演示页面5，演示嵌套路由
      </div>
      <div>这是头部</div>
      <div>下面是动态route</div>
      <div>
        <NavLink to={`${match.url}`}>首页</NavLink>
        <NavLink to={`${match.url}/page-a`}>页面A</NavLink>
        <NavLink to={`${match.url}/page-b`}>页面B</NavLink>
      </div>
      <div>
        <Switch>
          <Route path={`${match.path}/page-a`} component={PageA} />
          <Route path={`${match.path}/page-b`} component={PageB} />
          <Route path={match.path}>
            这里默认显示的 father page
          </Route>
        </Switch>
      </div>
      <div>这是脚部</div>

    </div>)
  }
}
