import React, { useState, useCallback } from "react";
import { useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types from "@views/ReactDnd/datas/Types";



const Snack = (props) => {
  const { children = '某零食', style = {}, role = 'source', index = 0 } = props
  // console.log('snack render')

  // collected是一个对象，来源于 collect 方法的回参
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: Types.SNACK,
    beginDrag: () => {
      return {
        aji: 'ajiiii'
      }
    },
    item: {
      name: 'snack',
      content: children,
      style,
      index,
      role,
    },
    // item: dragObject，对应 useDrag.item 设置
    // 通常会在 end 这个方法内使用 monitor.getDropResult()
    end: (item, monitor) => {
      // const dropResult = monitor.getDropResult();
      // console.log(item, monitor.getDropResult())
    },
    collect: (monitor) => {
      // console.log(monitor)
      // 必须返回一个 object，包含一些计算好的内容以供使用
      monitor.isDragging()    // 返回true/false
      monitor.canDrag()       // true/false
      monitor.getItemType()   // 返回 dragSource的 type
      monitor.getItem()       // ?
      monitor.getDropResult() // 这个内容通常来源于 dropSource.drop 方法返回的内容
      monitor.didDrop()       // 同上
      return {
        isDragging: !!monitor.isDragging(),
      }
    }
  }), [style])
  const { isDragging } = collected
  // console.log(collected, drag, dragPreview)

  return (<div className={'snack' + (isDragging ? ' dragging' : '')} style={style} ref={drag}>
    {children}
  </div>)
}

export default Snack
