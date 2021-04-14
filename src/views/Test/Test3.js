import React, { useCallback, useEffect, useState, useRef, memo } from 'react'
import update from 'immutability-helper'
import DropUtils from "@views/ReactDnd/Eg3/DropUtils";

const Comp = memo((props) => {
    const { name, age } = props
  const ref = useRef(null)

  console.log('刷新,', name)

  useEffect(() => {
    console.log('effect, ', name)

    const fun = DropUtils.setDebounce('', (evts) => {
      console.log('fun debounce resize, roomId')
    })

    // 再次更新了这段代码
    if (ref.current.resizeObserver) {
      ref.current.resizeObserver.unobserve(ref.current)
    }
    ref.current.resizeObserver = new window.ResizeObserver(fun)
    ref.current.resizeObserver.observe(ref.current)
  })


    return (<div ref={ref}>
      <h3>{name}</h3>
      <h3>{age}</h3>
    </div>)
  }
)
export default function Text3 () {
  const [list, setList] = useState([
    { name: 'curry', age: 18 },
    { name: 'KD', age: 28 },
    { name: 'James', age: 38 },
  ])

  const setList2 = () => {
    let i = Math.floor(Math.random() * (2 - 0 + 1) + 0)
    let a = Math.floor(Math.random() * (40 - 20 + 1) + 20)
    const newD = update(list, {
      [i]: {
        age: {
          $set: a
        }
      }
    })
    setList(newD)
  }
  useEffect(() => {
    console.log('father eeefff')
  })

  return (<div>
    <button onClick={setList2}>改变</button>
    {
      list.map((o, i) => {
        return (
          <Comp key={i} name={o.name} age={o.age}/>
        )
      })
    }
  </div>)
}
