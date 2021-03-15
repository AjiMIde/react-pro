import React from 'react'
import { Link } from 'react-router-dom'

export default class Hooks extends React.Component {
  componentDidMount () {
    console.log(this.props)
  }

  render() {
    return (<div className={'hooks'}>
      <li>useCallback能够减少对 父子之间传递事件、参数后，影响到的沉浸，它是一个缓存，只有对比到值变化的时候才进行渲染</li>
      <Link to={'/hook-use-callback'}>useCallback</Link>
    </div>)
  }
}
