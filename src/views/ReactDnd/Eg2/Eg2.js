import React, { memo, useCallback, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import Snack from './Snack'
import DeskItem from './DeskItem'
import Bench from './Bench'
import '../Dnd.scss'


const Eg2 = memo(() => {
  const [benches, setBenches] = useState([
    { index: 0, snacks: ['花生', '海带'] },
    { index: 1, snacks: ['海带', '花生']},
    { index: 2, snacks: ['黄瓜'] },
  ])

  const [deskItem, setDeskItem] = useState([
    { index: 0, desc: '11' },
    { index: 1, desc: '22' },
    { index: 2, desc: '33' },
  ])

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = benches[dragIndex];
    let newData = update(benches, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    })
    setBenches(newData);
  }, [benches]);

  const moveCard2 = useCallback((dragIndex, hoverIndex) => {
    const dragCard = deskItem[dragIndex];
    let newData = update(deskItem, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    })
    setDeskItem(newData);
  }, [deskItem]);


  return (<div className={'eg2'}>
    <div className="kitchen">
      <h4>厨房</h4>
      <h5>工作台1</h5>
      {
        benches.map((o, i) => (
            (<Bench index={i} key={o.index} snacks={o.snacks} moveCard={moveCard}/>)
        ))
      }
    </div>
    <div className={'desk'}>
      <h4>餐桌</h4>
      <h5>餐桌1</h5>
      {
        deskItem.map((o, i) => (
          <DeskItem index={i} key={i} desc={o.desc} moveCard={moveCard2}/>
        ))
      }
    </div>
  </div>)
})




function Wrapper() {
  return (
    <div className={'eg1'}>
      <DndProvider backend={HTML5Backend}>
        <Eg2/>
      </DndProvider>
    </div>
  )
}

export default Wrapper


