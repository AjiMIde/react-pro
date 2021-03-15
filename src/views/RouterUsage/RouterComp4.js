import React from 'react'

export default class RouterComp4 extends React.Component {
  componentDidMount () {
  }
  render() {
    const { match, location } = this.props
    console.log('???')
    console.log(this.props)
    console.log(location.state)
    return (<div className={'router-comp'}>
      <div>
        这是演示页面4，演示了从url上取参的几种方式
      </div>
      <div>
        <li>使用<code>:param + props.match</code>{match.params.name}</li>
        <li>使用<code>query + location.search</code>{location.search}</li>
        {
          location.state ?
            (<li>使用<code>Link + to(object)取值（比较重要，请详见代码）</code>{location.state.name}: {location.state.sex}: {location.state.age}</li>) : null
        }
      </div>

    </div>)
  }
}
