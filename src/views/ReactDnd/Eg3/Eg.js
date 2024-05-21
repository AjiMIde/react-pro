import React, { memo, useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import _ from 'lodash'
import update from 'immutability-helper'

import Snack from './Snack'
import Desk from './Desk'
import './Dnd.scss'

const Eg = memo(() => {
  const [desks, setDesks] = useState([
    { id: '1', items: []},
    { id: '2', items: []},
    { id: '3', items: []},
  ])

  console.log(desks)

  const updateDesks = useCallback((data) => {
    if (data.action === 'add') {
      const n = update(desks, {
        [data.deskIndex]: {
          items: {
            $push: [data.value]
          }
        }
      })
      setDesks(n)
    }
    // 同桌
    else if (data.action === 'move' && data.fromDeskIndex === data.deskIndex) {
      const n = update(desks, {
        [data.fromDeskIndex]: {
          items: {
            [data.index]: {
              $merge: data.value
            }
          }
        }
      })
      setDesks(n)
    }
    else if (data.action === 'move') {
      const n = update(desks, {
        [data.fromDeskIndex]: {
          items: {
            $splice: [[data.index, 1]]
          }
        },
        [data.deskIndex]: {
          items: {
            $push: [data.value]
          }
        }
      })
      setDesks(n)
    }
    else if (data.action === 'reorder') {
      const desk = desks[data.dragIndex]
      const n = update(desks, {
        $splice: [
          [data.dragIndex, 1],
          [data.hoverIndex, 0, desk],
        ],
      })
      setDesks(n)
    }
  }, [desks])

  return (<div className={'eg1'}>
    <div className="kitchen">
      <h4>厨房</h4>
      <div className="bench">
        <Snack>花生</Snack>
        <Snack>黄瓜</Snack>
        <Snack>海带丝</Snack>
      </div>
    </div>


    <div className={'desk'}>
      <h4>餐桌</h4>
      {
        desks.map((o, i) => {
          return (<Desk key={o.id} index={i} id={o.id} items={o.items} updateDesks={updateDesks}/>)
        })
      }
    </div>
  </div>)
})




function Wrapper() {
  return (
    <div className={'eg1'}>
      <DndProvider backend={HTML5Backend}>
        <Eg/>
      </DndProvider>
    </div>
  )
}

export default Wrapper


