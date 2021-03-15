import React, { memo, useCallback, useState, useEffect } from 'react'

class HkUseCallback2 extends React.Component {
  componentDidMount () {
  }

  render () {
    return (<div>
    </div>)
  }
}


// 无论使用function组件还是class组件，当子组件A，调用了 props.father.method, 并更新了 father.state，引起 father.render 渲染
// 那子组件B、C、D等都会触发渲染，造成浪费
// useCallback 就是来解决这个问题的

function PageA ({ onClick, name }) {
  console.log('pageA updated!')
  return <div onClick={onClick}>pageA: {name}</div>
}

function PageB ({ onClick, name }) {
  console.log('pageB updated!')
  return <div onClick={onClick}>pageB: {name}</div>
}

function PageC ({ onClick, name }) {
  console.log('pageC updated!')
  return <div onClick={onClick}>pageC: {name}</div>
}

function HkUseCallback () {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)

  const handleClick1 = () => {
    setA(a + 1)
  }

  const handleClick2 = () => {
    setB(b + 1)
  }

  const handleClick3 = useCallback(() => {
    setC(c + 1)
  }, [c])

  return (
    <div>
      <li>打开console可以发现，点击 pageA，pageA改变，并渲染，但是 pageB 也重新渲染，反之一样，即使他们的值不改变</li>
      <li>而 pageC 不改变，这就是 useCallback 的用处，只有一个当被 useCallback 引用到的被更新，才真正渲染到 pageC 中去</li>
      <PageA onClick={handleClick1} name={a}/>
      <PageB onClick={handleClick2} name={b}/>
      <PageC onClick={handleClick3} name={c}/>
    </div>
  )
}

export default HkUseCallback


