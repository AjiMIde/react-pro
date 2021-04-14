import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types, { Camps } from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import Snack from "@views/ReactDnd/Eg3/Snack";
import update from "_immutability-helper@3.1.1@immutability-helper";
import DropUtils from "@views/ReactDnd/Eg3/DropUtils";

const Desk = memo((props) => {
  const ref = useRef(null)
  const {
    prop, index, index: deskIndex, roomIndex, onDeskResize,onDeskDrop
  } = props
  const { camp = '', content = '', style, items = [] } = prop

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: Types.DESK,
    beginDrag: () => {
      return { aji: 'ajiiii' }
    },
    item: {
      ...prop,
      type: Types.DESK,
      roomIndex,
      deskIndex,
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
      return {
        isDragging: !!monitor.isDragging(),
      }
    }
  }), [props])

  const [{ handlerId }, drop] = useDrop({
    accept: [Types.SNACK],

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    drop: (dragObj, monitor) => {
      console.log('Desk drop a ', dragObj)
      // 从 SOURCE 中移入
      if (dragObj.camp === Camps.SOURCE) {
        const { left, top } = DropUtils.computedDropPos(ref.current, monitor)
        //
        const newDragObj = IhUpdate(dragObj, {
          style: {
            $merge: {
              left, top
            }
          },
          camp: {
            $set: Camps.DESK
          },
        })
        onDeskDrop(roomIndex, deskIndex, -1, -1, -1, newDragObj)
      }

      // 在桌子间移动
      if (dragObj.camp === Camps.DESK || dragObj.camp === Camps.ROOM) {
        console.error('aji', roomIndex, deskIndex, dragObj.roomIndex, dragObj.deskIndex, dragObj.snackIndex)
        const { left, top } = DropUtils.computedDropPos(ref.current, monitor)
        const newDragObj = update(dragObj, {
          style: {
            $merge: { left, top }
          }
        })
        onDeskDrop(roomIndex, deskIndex, dragObj.roomIndex, dragObj.deskIndex, dragObj.snackIndex, newDragObj)

        // if (dragObj.roomId === '') {
        //   const delta = monitor.getDifferenceFromInitialOffset()
        //   const left = Math.round(dragObj.style.left + delta.x)
        //   const top = Math.round(dragObj.style.top + delta.y)
          // onItemMove(index, dragObj.index, left, top)
        } else {
          // console.log('移动到别的房间')
          // const {x: startX } = monitor.getInitialSourceClientOffset()
          // const {x: endPointX, y: endPointY } = monitor.getSourceClientOffset()
          // y 要用另一种算法
          // const {x: fatherX , y: fatherY} = ref.current.getBoundingClientRect()
          // const [ x, y ] = [Math.round(Math.abs(endPointX - fatherX)), Math.round(Math.abs(endPointY - fatherY))]
          // const excursion = 2 // 不知道为什么产生了偏移量，也许是盒模型？或许是计算方法 abs, round 有问题？todo， x 有偏移量计算问题
          // console.log(fatherX, fatherY, endPointX, endPointY)
          // const newDragObj = update(dragObj, {
          //   style: {
          //     left: { $set: x + excursion},
          //     top: { $set: y + excursion},
          //   }
          // })
          // onItemJump(index, dragObj.roomId, newDragObj.index, newDragObj)
        // }
      }

      // 从房间内移动进来
      if (dragObj.camp === Camps.ROOM) {

      }
      return {
      }
    }
  });

  useEffect(() => {
    const fun = DropUtils.setDebounce('', (evts) => {
      console.log('fun debounce resize, desk', index)
      let { height: h, width: w } = evts[0].target.getBoundingClientRect()
      h = Math.round(h)
      w = Math.round(w)
      if (h && w && style.height !== h && style.width !== w) {
        onDeskResize && onDeskResize(roomIndex, index, h, w)
      }
    })

    if (ref.current.resizeObserver) {
      ref.current.resizeObserver.unobserve(ref.current)
    }
    ref.current.resizeObserver = new window.ResizeObserver(fun)
    ref.current.resizeObserver.observe(ref.current)
  })

  const newStyle = {}
  if (camp === Camps.SOURCE) {
    newStyle.position = 'relative'
  } else if (camp === Camps.ROOM) {
    newStyle.position = 'absolute'
  } else {
    newStyle.position = 'relative'
  }

  drag(drop(ref))

  const { isDragging } = collected

  return (<div className={'desk' + (isDragging ? ' dragging' : '')} style={{ ...style, ...newStyle }} ref={ref}
               data-handler-id={handlerId}>
    {
      items.length ? items.map((o, i) => {
        return (
          <Snack key={i} index={i} roomIndex={roomIndex} deskIndex={deskIndex} prop={o}/>
        )
      }) : '桌子'
    }
  </div>)
  }
)
export default Desk
