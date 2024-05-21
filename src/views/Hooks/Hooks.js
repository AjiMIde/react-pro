import React from 'react'
import { Link } from 'react-router-dom'

// import HkUseMemo from "@views/Hooks/HkUseMemo2";
import HkUseMemo from "@views/Hooks/HkUseMemo";
import HkUseCallback from '@views/Hooks/HkUseCallback'
import HkUseEffect from "@views/Hooks/HkUseEffect";

export default class Hooks extends React.Component {
  constructor () {
    super()
    this.state = {
      b: false
    }
  }
  componentDidMount () {
    console.log(this.props)
  }

  click1 = () => {
    this.setState({
      b: !this.state.b
    })
  }

  render() {
    const {b} = this.state
    return (<div className={'hooks'}>

      <HkUseEffect />

      {/*{b && <HkUseEffect />}*/}

      {/*<button onClick={this.click1}>click me</button>*/}

      <HkUseMemo/>

      <HkUseCallback/>

    </div>)
  }
}
