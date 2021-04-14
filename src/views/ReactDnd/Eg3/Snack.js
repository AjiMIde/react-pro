import React, { useState, useCallback, memo } from "react";
import { useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types, { Camps } from "@views/ReactDnd/datas/Types";


const Snack = memo((props) => {
  const { prop, index, index: snackIndex, roomIndex = -1, deskIndex = -1 } = props
  const { style = {}, camp = '', content = '' } = prop

  // collected是一个对象，来源于 collect 方法的回参
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: Types.SNACK,
    beginDrag: () => {
      return {
        aji: 'ajiiii'
      }
    },
    item: {
      ...prop,
      type: Types.SNACK,
      roomIndex,
      snackIndex,
      deskIndex,
    },
    // item: dragObject，对应 useDrag.item 设置
    // 通常会在 end 这个方法内使用 monitor.getDropResult()
    end: (item, monitor) => {
      // const dropResult = monitor.getDropResult();
      // console.log('snack drag end: ', item, monitor.getDropResult())
    },
    collect: (monitor) => {
      // console.log(monitor)
      // 必须返回一个 object，包含一些计算好的内容以供使用
      monitor.isDragging()    // 返回true/false
      monitor.canDrag()       // true/false
      monitor.getItemType()   // 返回 dragSource的 type
      monitor.getItem()       // ?
      monitor.getDropResult() // 这个内容通常来源于 dropSource.drop 方法返回的内容
      monitor.didDrop()       // 这个指的是，是否有dropSource 已经处理了 dropEvent，
                              // 通常用在 drop() 中来判断当前是否有多个嵌套的 dropSource 中的某个 dropSource 处理好了事件
      return {
        isDragging: !!monitor.isDragging(),
      }
    }
  }), [props])
  const { isDragging } = collected
  // console.log(collected, drag, dragPreview)

  const newStyle = {}
  if (camp === Camps.SOURCE) {
    newStyle.position = 'relative'
  } else if (camp === Camps.ROOM || camp === Camps.DESK ) {
    newStyle.position = 'absolute'
  } else {
    newStyle.position = 'relative'
  }

  return (<div className={'snack' + (isDragging ? ' dragging' : '')} style={{...style, ...newStyle}} ref={drag}>
    {content}
  </div>)
})

export default Snack
