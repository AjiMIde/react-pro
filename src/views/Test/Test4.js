import React, { useCallback, useEffect, useState, useRef, memo } from 'react'
import update from 'immutability-helper'
import DropUtils from "@views/ReactDnd/Eg4/DropUtils";
import $update from "immutability-helper";

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

function Test4 () {
  const [list, setList] = useState([
    { name: 'curry', age: 18 },
    { name: 'KD', age: 28 },
    { name: 'James', age: 38 },
  ])

  const setList2 = () => {
    const list2 = list
    list2[1].age = 38
    setList(list2)
  }

  return (<div>
    <button onClick={setList2}>改变</button>
    {
      list.map((o, i) => {
        return (
          <div>
            <span> {o.name}  </span>
            <span> {o.age}  </span>
          </div>
        )
      })
    }
  </div>)
}

const testA = async () => {
  let d = null
  await (import('./data').then(resolve => {
    console.log(resolve, resolve.default, '---')
    d = resolve.default
  })).then(resolve => {
    console.log(resolve, '??')
  })
  console.log(d, '===')
}

console.log(aji, aji2)

// testA()

function Test5 () {
  const [list, setList] = useState([
    { name: 'curry', age: 18 },
    { name: 'KD', age: 28 },
    { name: 'James', age: 38 },
  ])


  useEffect(() => {
    window.setTimeout(() => {
      const list2 = $update(list, {
        [1]: {
          age: {
            $set: 38
          }
        }
      })
      setList(list2)
    }, 1000)

    window.setTimeout(() => {
      const list2 = $update(list, {
        [2]: {
          age: {
            $set: 48
          }
        }
      })
      setList(list2)
    }, 3000)

  }, [''])

  return (<div>
    <div onClick={testA}>test a</div>
    {
      list.map((o, i) => {
        return (
          <div>
            <span> {o.name}  </span>
            <span> {o.age}  </span>
          </div>
        )
      })
    }
  </div>)

}

function Test6 () {
  const [person, setPerson] = useState({
      name: 'curry',
      age: 18,
  })

  useEffect(() => {
    console.log('change')
  }, [person])

  useEffect(() => {
    window.setTimeout(() => {
      // setPerson({
      //   ...person,
      //   name: 'curry'
      // })
      // setPerson($update(person, {
      //   name: {
      //     $set: 'curry'
      //   }
      // }))
      // setPerson(old => ({
      //   ...old,
      //   name: 'curry'
      // }))
    }, 1000)
  }, [])

  return <div>
    <div>
      <span> {person.name}  </span>
      <span> {person.age}  </span>
    </div>
  </div>

}

const aji = {
  name: 'aji'
}

const aji2 = $update(aji, {
  name: {
    $set: 'aji'
  }
})

console.log(aji, aji2)

export default Test6
