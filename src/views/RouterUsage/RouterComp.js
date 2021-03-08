import React from 'react'

export default class RouterComp extends React.Component {
  componentDidMount () {
    console.log(this.props)
  }

  render() {
    return (<div className={'router-comp'}>
      router comp
    </div>)
  }
}
