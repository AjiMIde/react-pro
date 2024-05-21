import React, { memo, useCallback, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend'
import Eg1 from "@views/ReactDnd/Eg1/Eg1"
import Eg2 from '@views/ReactDnd/Eg2/Eg'
import Eg3 from '@views/ReactDnd/Eg3/Eg'
import Eg4 from '@views/ReactDnd/Eg4/Eg'


function Dnd () {
  return (

    <div className={'react-dnd-eg'}>
      <h2>一个简单的实例，通过 drag/drop 实现上菜功能，并使用了 dragging/isOver 等 </h2>
      {/*<Eg1/>*/}

      <h2>'react-dnd-html5-backend'.NativeTypes 使用</h2>
      <p>通过使用 `react-dnd-html5-backend`.NativeTypes.FILE/HTML/TEXT/URL</p>
      <p>能够实现诸如拖动上传的业务功能</p>
      {/*<Eg2/>*/}

      <h2>实现了自由拖动absolute, 排序功能</h2>
      <p>你可以从厨房拖动“菜”到桌子，也可以在桌子间移动“菜”，亦可以排序桌子</p>
      <Eg3/>

      <h2>一个比较完整的实例，实现了排序，编组，多重组之间的调换，特别是 resize</h2>
      <Eg4/>

      {/*<Eg33/>*/}
      {/*<h2>简单的实例，实现从左到右边的拖动</h2>*/}
      {/*<h2>简单的实例，可排序的工作台和桌台</h2>*/}
      {/*<Eg22/>*/}


    </div>
  )
}

export default Dnd


