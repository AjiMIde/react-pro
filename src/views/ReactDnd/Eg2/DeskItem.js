import React, { useState, useCallback, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import Snack from "@views/ReactDnd/Eg2/Snack";

const DeskItem = (props) => {
  const ref = useRef(null)

  const [contents, setContents] = useState([])
  const { moveCard, index, desc } = props

  const moveItems = (item, left, top) => {
    setContents(IhUpdate(contents, {
      [item.index]: {
        style: {
          $merge: {left, top}
        }
      }
    }))
  }

  const [{ isOver, handlerId }, drop] = useDrop(
    () => ({
      accept: [Types.SNACK, 'deskItem'],
      // dragObj 是 dragSource 中的 item
      drop: (dragObj, monitor) => {
        console.log(dragObj, monitor)
        if (dragObj.role === 'deskItem') {
          return
        }
        if (dragObj.role === 'source') {
          //
          const deskItem = document.getElementById('eg2-deskItem')
          const { offsetTop, offsetLeft } = deskItem
          const { x, y } = monitor.getSourceClientOffset() || { x: 0, y: 0}
          const { scrollTop, scrollLeft } = window.document.documentElement
          console.log(offsetTop, offsetLeft)
          console.log(x, y)
          const left = Math.round(x - offsetLeft + scrollLeft)
          const top = Math.round(y - offsetTop + scrollTop)
          //

          const newDragObj = { ...dragObj, style: { left, top }, role: 'innerItem' }
          setContents(IhUpdate(contents, { $push: [newDragObj] }))

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
          handlerId: monitor.getHandlerId(),
        }
      },
      hover (item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        console.log(dragIndex, hoverIndex)
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },

    }), [contents]
  )

  const [{ isDragging }, drag] = useDrag({
    type: 'deskItem',
    item: () => {
      return { index, role: 'deskItem' };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref))

  let style = isDragging ? { opacity: 0.5 } : { opacity: 1 }


  return (<div className={'desk-item' + (isOver ? ' over' : '')} ref={ref} id={'eg2-deskItem'} style={style} data-handler-id={handlerId}>
    { desc }
    {
      contents.map((item, index) => (
        <Snack key={index} role={'inner'} index={index} style={item.style}>{item.content}</Snack>
      ))
    }
  </div>)
}

export default DeskItem
