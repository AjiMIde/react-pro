import React, { useState, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider, Consumer } from './Context'

// console.log(Provider, Consumer)

window.pp = Provider
Window.cc = Consumer || 'aji'

function SonSon () {
  console.log(Consumer)
  return (
    <div className='rp-block'>
      <h1>SonSon</h1>
      <Consumer>
        {
          (value) => {
            return (
              <div>
                <h2>{value.name}</h2>
              </div>
            )
          }
        }
      </Consumer>
    </div>
  )
}

function Son () {
  return (
    <div className='rp-block'>
      <h1>Son</h1>
      <div className="content">
        <SonSon />
      </div>
    </div>
  )
}

function Father () {
  const [state, setState] = useState({ name: 'thompson', authToken: '112233' })

  return (
    <div className='rp-block'>
      <h1>Father</h1>
      <button onClick={() => setState({name: 'wiggins'})}>click</button>
      <Provider value={state} >
        <div className="content">
          <Son />
        </div>
      </Provider>
    </div>
  )
}

export default Father




