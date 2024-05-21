import $store from './Store'

function C2 () {
  const updateT = () => {
    $store.dispatch({
      type: 'updateTime'
    })
  }
  return (<div>
    <h1>c2</h1>
    <div onClick={updateT}>更新时间</div>
  </div>)
}

export default C2
