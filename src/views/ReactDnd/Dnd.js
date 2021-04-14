import React, { memo, useCallback, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Eg1 from "@views/ReactDnd/Eg1/Eg1"
import Eg2 from "@views/ReactDnd/Eg2/Eg2"
import Eg3 from "@views/ReactDnd/Eg3/Eg3";

function Dnd() {
  return (

  <div className={'react-dnd-eg'}>
      {/*<h2>简单的实例，实现从左到右边的拖动</h2>*/}
      {/*<Eg1/>*/}

      {/*<h2>简单的实例，可排序的工作台和桌台</h2>*/}
      {/*<Eg2/>*/}

      <h2>一个完整的实例，可以从左拖到右，右边可排序，右边可随意在房间，桌子间转移菜品</h2>
      <Eg3/>

    </div>
  )
}

export default Dnd


