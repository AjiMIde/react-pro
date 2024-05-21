import React, { memo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Snack from './Snack'
import Desk from './Desk'
import './Dnd.scss'

const Eg1 = memo(() => {

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
      <Desk />
    </div>
  </div>)
})




function Wrapper() {
  return (
    <div className={'eg1'}>
      <DndProvider backend={HTML5Backend}>
        <Eg1/>
      </DndProvider>
    </div>
  )
}

export default Wrapper


