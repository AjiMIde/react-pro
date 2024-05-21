import React, { memo, useCallback, useEffect, useState } from 'react'
import $update from 'immutability-helper'
import './Test2.scss'


const obj = {
  name: 'curry',
  sex: 'man',
  prop: {
    style: {
      w: 50,
      h: 50
    }
  }
}

const obj2 = {
  name: 'jame',
  sex: 'woman',
  prop: {
    ...obj.prop
  }
}

const obj3 = $update(obj, {
  name: {
    $set: 'tomsome'
  }
})




window.ary = []

const CompA = memo((props) => {
  const { style, id, change1 } = props

  console.log('comA ', id, ' render')

  const fun1 = () => {
    change1(id)
  }

  return <div className={'compA'} style={style}>
    <button onClick={fun1}>change</button>
    { style.content }
  </div>
})

export default function Test2 () {
  const [list, setList] = useState([
    { id: 0, style: {width: 100, height: 30, content: '222'}},
    { id: 1, style: {width: 100, height: 40, content: '222'}},
    { id: 2, style: {width: 100, height: 50, content: '222'}},
  ])
  const [val, setVal] = useState(1)

  const change1 = useCallback((index) => {
      const newList = $update(list, {
        [index]: {
          style: {
            height: {
              $set: 80
            }
          }
        }
      })
      setList(newList)
    }, [list]
  )


  useEffect(() => {
    console.log('father render')

    return () => {
      console.log('father un render ')
    }
  })

  return (<div className={'test2'}>
    <div>
      <button onClick={change1}>改变</button>
    </div>
    {
      list.map((o, i) => {
        return (<div key={i}>
          <CompA style={o.style} id={o.id} change1={change1}/>
        </div>)
      })
    }
  </div>)
}
