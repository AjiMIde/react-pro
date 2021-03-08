import React from 'react'

export default class RouterComp3 extends React.Component {
  componentDidMount () {
  }
  goBack = () => {
    this.props.history.goBack()
  }
  push = () => {
    this.props.history.push('/router-usage')
  }
  replace = () => {
    this.props.history.push('/router-usage')
  }

  render() {
    return (<div className={'router-comp'}>
      <div>
        这是演示页面3，使用了props.history.goBack/push/replace/goForward等函数方法
      </div>
      <div>
        <li>
          <button onClick={this.goBack}>goBack</button>
        </li>
        <li>
          <button onClick={this.push}>push</button>
        </li>
        <li>
          <button onClick={this.replace}>replace</button>
        </li>
      </div>

    </div>)
  }
}
