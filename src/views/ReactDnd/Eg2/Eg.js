import React, { memo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Snack from './Snack'
import Desk from './Desk'
import './Dnd.scss'

const Eg = memo(() => {

  return (<div className={'eg1'}>
    {/*<div className="kitchen">*/}
    {/*  <h4>厨房</h4>*/}
    {/*  <div className="bench">*/}
    {/*    <Snack>花生</Snack>*/}
    {/*  </div>*/}
    {/*</div>*/}


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
        <Eg/>
      </DndProvider>
    </div>
  )
}

export default Wrapper


