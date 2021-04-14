import React from 'react'
import { Link } from 'react-router-dom'

// import HkUseMemo from "@views/Hooks/HkUseMemo2";
import HkUseMemo from "@views/Hooks/HkUseMemo";
import HkUseCallback from '@views/Hooks/HkUseCallback'

export default class Hooks extends React.Component {
  componentDidMount () {
    console.log(this.props)
  }

  render() {
    return (<div className={'hooks'}>
      <HkUseMemo/>

      <HkUseCallback/>
    </div>)
  }
}
