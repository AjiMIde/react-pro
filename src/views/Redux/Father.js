import C1 from './Child1'
import C2 from './Child2'
import C3 from './Child3'
import Store from './Store2'
import immutable from 'immutable'
import { useState } from 'react'
import update from 'immutability-helper'


const a = {
  style: {
    w: 100,
    h: 200
  },
  name: 'aji'
}

// const b = immutable.Map(a, {})


function Father () {
  const aji = {
    s: {
      w: {
        h: 100
      }
    }
  }
  window.aji = aji
  const [style, setStyle] = useState(aji)

  Store.subscribe(() => {
    console.log(Store.getState())
  })

  const click1 = () => {
    Store.dispatch({
      type: 'add',
      value: 2
    })
  }

  const click2 = () => {
    const s = Store.getState().sex === 'man' ? 'woman' : 'man'
    Store.dispatch({
      type: s
    })
  }

  const click3 = () => {
    setStyle({
      s: {
        w: {
          h: 200
        }
      }
    })
  }

  return (<div>
    <h1> father </h1>

    <button onClick={click1}>点我</button>
    <button onClick={click2}>点我</button>
    <button onClick={click3}>{style.w}</button>


    {/*<C1/>*/}
    {/*<C2/>*/}
    {/*<C3/>*/}

  </div>)
}

export default Father
