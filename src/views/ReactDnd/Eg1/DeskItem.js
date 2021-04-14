import React, { useState, useCallback, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import Snack from "@views/ReactDnd/Eg1/Snack";

const DeskItem = (props) => {
  const [contents, setContents] = useState([])
  const ref = useRef(null)

  const moveItems = (item, left, top) => {
    setContents(IhUpdate(contents, {
      [item.index]: {
        style: {
          $merge: {left, top}
        }
      }
    }))
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: Types.SNACK,
      // dragObj 是 dragSource 中的 item
      drop: (dragObj, monitor) => {
        // console.log(dragObj, monitor)
        if (dragObj.role === 'source') {
          //
          const deskItem = document.getElementById('deskItem')
          const { offsetTop, offsetLeft } = deskItem
          const { x, y } = monitor.getSourceClientOffset() || { x: 0, y: 0}
          console.log(offsetTop, offsetLeft)
          console.log(x, y)
          const left = Math.round(x - offsetLeft)
          const top = Math.round(y - offsetTop)
          //

          dragObj.style = {
            left, top
          }
          setContents(IhUpdate(contents, { $push: [dragObj] }))
        } else {

          const delta = monitor.getDifferenceFromInitialOffset()
          const left = Math.round(dragObj.style.left + delta.x)
          const top = Math.round(dragObj.style.top + delta.y)
          moveItems(dragObj, left, top)
        }

        monitor.getInitialClientOffset()              // 开始drag时，指针相于window的位置信息 {x, y}
        monitor.getClientOffset()                     // dragging过程中，指针相于window的位置信息 {x, y}
        monitor.getInitialSourceClientOffset()        // 开始drag时，dragSource 相对于 window 的位置信息 {x, y}
        monitor.getDifferenceFromInitialOffset()      // 计算当前指针的位置信息与 dragSource 的**之前的位置**的差值 {x, y}，通常用这个值来计算box内的element移动量
        monitor.getSourceClientOffset()               // 结束drag时，dragSource 相对于 window 的位置信息 {x, y}

        return {
          value: 'from drop source'
        }
      },
      // collect 返回一个对象，对象的内容对应着 useDrop 的回参的第一个参 collected
      collect: (monitor) => {
        monitor.isOver()      // 是否有 dragSource over
        monitor.canDrop()     // 查看当前的 dragSource 的 type 是否在 accept 的范围内
        return {
          isOver: !!monitor.isOver(),   // 是否被
        }
      }
    }), [contents]
  )

  // drop(ref) // 可以把 ref 给 drop 装饰，然后 ref={ref}，这样就可以通过 ref.current 获取对象
  // 也可以直接使用 ref={drop} ，这是常规的做法

  return (<div className={'desk-item' + (isOver ? ' over' : '')} ref={drop} id={'deskItem'}>
    {
      contents.map((item, index) => (
        <Snack key={index} role={'inner'} index={index} style={item.style}>{item.content}</Snack>
      ))
    }
  </div>)
}

export default DeskItem
