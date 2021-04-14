import React, { memo, useCallback, useState, useEffect } from 'react'

class TheClass extends React.PureComponent {
  constructor () {
    super();
    this.state = {
      name: 'Curry',
      age: 18
    }
  }
  changeAge = () => {
    this.setState({
      age: 19
    })
  }

  componentDidUpdate () {
    console.log('did update')
  }

  componentWillUpdate () {
    console.log('will update')
  }

  render () {
    const { name, age } = this.state
    return (<div>
      <div>name: {name}</div>
      <div>age: {age}</div>
      <button onClick={this.changeAge}>change age</button>
    </div>)
  }
}

function Child (props) {
  console.log('child mounted')
  return (<div>
    Curry is {props.age} old
  </div>)
}

function Father () {
  const [age, setAge] = useState(18)
  const changeAge = () => {
    setAge(19)
  }
  return (<div>
    <Child age={age}/>
    <button onClick={changeAge}>Change Age</button>
  </div>)

}

export default Father


