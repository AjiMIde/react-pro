import React, { useState, useMemo, useEffect } from 'react'

function HkUseEffect () {
  const [state, setState] = useState(1)
  const [person, setPerson] = useState({
    name: 'aji',
    sex: 'man'
  })

  // useEffect(() => {
  //   console.log('update')
  // })
  useEffect(() => {
    // console.log('the person name:', person.name)
    return () => {
      // console.log('leave: the person name:', person.name)
    }
  }, [person.name])

  console.log('1')

  useEffect(() => {
    console.log('render')
    return () => {
      console.log('leave')
    }
  })

  console.log('2')

  const onClick = () => {
    setState(state + 1)
    setPerson(oldV => ({
      ...oldV,
      sex: 'woman'
    }))
  }

  return (<div>
    <h3>useEffect</h3>
    <button onClick={onClick}>click me {state}</button>
  </div>)
}

export default HkUseEffect


