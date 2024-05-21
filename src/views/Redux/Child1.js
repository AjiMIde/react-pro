import $store from './Store'

function C1 () {
  const ct = $store.getState().currentTime
  return (<div>
    <h1>c1</h1>
    <div>{ct}</div>
  </div>)
}

export default C1
