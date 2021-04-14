import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types, { Camps } from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import DropUtils from "@views/ReactDnd/Eg3/DropUtils";
import _ from "lodash";
import Snack from './Snack'
import update from "immutability-helper";
import Desk from "@views/ReactDnd/Eg3/Desk";

const Room = memo((props) => {
  const {
    prop: { style = {}, desc = '', items = [], id:roomId },
    index, index: roomIndex,
    onRoomResize, moveCard, onItemDrop, onItemMove, onItemJump,
    onDeskResize, onDeskDrop,
  } = props

  const deskProp = { onDeskResize, onDeskDrop }

  const ref = useRef(null)

  useEffect(() => {
    const fun = DropUtils.setDebounce('', (evts) => {
      console.log('fun debounce resize, roomId', roomId )
      let h = evts[0].target.getBoundingClientRect().height
      h = Math.round(h)
      if (style.height !== h) {
        onRoomResize(index, h)
      }
    })

    // 再次更新了这段代码
    if (ref.current.resizeObserver) {
      ref.current.resizeObserver.unobserve(ref.current)
    }
    ref.current.resizeObserver = new window.ResizeObserver(fun)
    ref.current.resizeObserver.observe(ref.current)
  })

  const [{ handlerId }, drop] = useDrop({
    accept: [Types.ROOM, Types.SNACK, Types.DESK],

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    drop: (dragObj, monitor) => {
      console.log(dragObj, '>>--')
      // 如果已经有程序处理了 drop 事件
      if (monitor.didDrop()) {
        return
      }
      if (dragObj.camp === Camps.SOURCE) {
        const roomEle = ref.current
        const { offsetTop, offsetLeft } = roomEle
        const { x, y } = monitor.getSourceClientOffset() || { x: 0, y: 0}
        const { scrollTop, scrollLeft } = window.document.documentElement
        const left = Math.round(x - offsetLeft + scrollLeft)
        const top = Math.round(y - offsetTop + scrollTop)
        //
        const newDragObj = IhUpdate(dragObj, {
          style: {
            $merge: {
              left, top
            }
          },
          camp: {
            $set: Camps.ROOM
          }
        })
        //
        if (newDragObj.type === 'desk') {
          newDragObj.content = ''
          newDragObj.items = []
        }
        onItemDrop(roomIndex, newDragObj)
      } else if (dragObj.camp === Camps.ROOM) { // 移动

        if (dragObj.roomIndex === roomIndex) {
          console.log('在当前房间内移动')
          // const delta = monitor.getDifferenceFromInitialOffset()
          // console.error(delta.x, delta.y, '??')
          // const left = Math.round(dragObj.style.left + delta.x)
          // const top = Math.round(dragObj.style.top + delta.y)

          const { left, top } = DropUtils.computedDropPos(ref.current, monitor)

          const newDragObj = IhUpdate(dragObj, {
            style: {
              $merge: { left, top }
            }
          })
          onItemMove(roomIndex, (dragObj.type === Types.SNACK ? dragObj.snackIndex : dragObj.deskIndex), newDragObj)
        } else {
          console.log('移动到别的房间')
          // const {x: endPointX, y: endPointY } = monitor.getSourceClientOffset()
          // const {x: fatherX , y: fatherY} = ref.current.getBoundingClientRect()
          // const [ left, top ] = [Math.round(Math.abs(endPointX - fatherX)), Math.round(Math.abs(endPointY - fatherY))]
          // console.log(fatherX, fatherY, endPointX, endPointY)
          const { left, top } = DropUtils.computedDropPos(ref.current, monitor)
          const newDragObj = update(dragObj, {
            style: {
              $merge: {
                left, top
              }
            },
            $unset: ['roomIndex', 'snackIndex']
          })
          onItemJump(roomIndex, dragObj.roomIndex, (dragObj.type === Types.SNACK ? dragObj.snackIndex : dragObj.deskIndex), newDragObj)
        }
      }
      return {

      }
    },

    hover: function (item, monitor) {
      if (!ref.current || item.type !== Types.ROOM) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // 检查
      if (DropUtils.canISortOrder(item.index, index, hoverBoundingRect, monitor.getClientOffset())) {
        console.log('????')
        moveCard(item.index, index);
        item.index = index;
      }
      // 修改 drag source 为当前 hoverIndex
    },
  });


  const [{ isDragging }, drag] = useDrag({
    type: Types.ROOM,
    item: () => {
      return { index, type: Types.ROOM };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref))


  let draggingStyle = isDragging ? { opacity: 0.2 } : { opacity: 1 }

  return (<div className={'room'} style={{ ...style, ...draggingStyle }} data-handler-id={handlerId} ref={ref} >
    <div className={'room-desc'}>房间-{roomId}</div>
    {
      items.map((o, i) => {
        return o.type === Types.SNACK ? (<Snack key={i} index={i} roomIndex={roomIndex} prop={o}/>) :
          (o.type === Types.DESK ? (<Desk key={i} index={i} roomIndex={index} prop={o} {...deskProp} />) :
            null)
      })
    }
  </div>)
})

export default Room
