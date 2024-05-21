import { useState } from 'react'
import $store from './Store'

function C3 () {
  const [t, st] = useState($store.getState().currentTime)
  $store.subscribe(() => {
    st($store.getState().currentTime)
  })
  return (<div>
    <h1>c3</h1>
    <div>{t}</div>
  </div>)
}

export default C3
