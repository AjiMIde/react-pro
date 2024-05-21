import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types, { Camps } from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import Snack from "@views/ReactDnd/Eg4/Snack";
import update from "_immutability-helper@3.1.1@immutability-helper";
import DropUtils from "@views/ReactDnd/Eg4/DropUtils";
import _ from 'lodash'

const Desk = memo((props) => {
  const ref = useRef(null)
  const {
    prop, index, campIndexes, indexes, onRoomUpdate,
  } = props
  const selfIndexes = campIndexes + ',' + index
  const { camp = '', content = '', style, items = [] } = prop

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: Types.DESK,
    item: {
      ...prop,
      type: Types.DESK,
      index,
      campIndexes,
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

  const [dropCollector, drop] = useDrop({
    accept: [Types.SNACK, Types.DESK],

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: !!monitor.isOver({
          shallow: true
        }),

      };
    },

    drop: (dragObj, monitor) => {
      //

      // 如果已经有程序处理了 drop 事件
      if (monitor.didDrop()) { return }
      // 由于 desk 可移动 desk，会导致移动时在同个源重叠，发现意外惊喜，所以，当同源 drop
      // 理应 return，把 drop 事件提交给上层 dropTarget

      console.error(dragObj)
      const { left, top } = DropUtils.computedDropPos(ref.current, monitor)
      const {x: moveLeft, y: moveTop } = monitor.getDifferenceFromInitialOffset()

      const dragSelfIndexes = dragObj.campIndexes + ',' + dragObj.index
      const dropSelfIndexes = campIndexes + ',' + index
      // drop对象是本身，则进行移动
      // 如果是在一层树内，且 drag 外层 to 内层，则是不允许的，这时移动
      if (dragSelfIndexes === dropSelfIndexes
        || (dropSelfIndexes.length > dragSelfIndexes.length && dropSelfIndexes.indexOf(dragSelfIndexes) > -1)
      ) {
        const newDragObj = _.cloneDeep(dragObj)
        newDragObj.style.left += moveLeft
        newDragObj.style.top += moveTop
        onRoomUpdate(dragObj.campIndexes, dragObj.campIndexes, index, newDragObj)
      }
      // 添加，或移动某事物到本身
      else {
        const newDragObj = IhUpdate(dragObj, {
          style: { $merge: { left, top, position: 'absolute' } },
        })
        const targetIndexes = campIndexes + ',' + index
        const fromIndexes = newDragObj.campIndexes || ''
        const dragObjIndex = (newDragObj.index === null || newDragObj.index === undefined) ? -1 : newDragObj.index
        onRoomUpdate(targetIndexes, fromIndexes, dragObjIndex, newDragObj)

      }




      // if (dragObj.indexes === '' || dragObj.indexes === null || dragObj.indexes === undefined) {
      //   onRoomUpdate(indexes + ',' + index, '', -1, newDragObj)
      // } else if (dragObj.indexes) { // 移动
      //   onRoomUpdate(indexes + ',' + index, dragObj.indexes, newDragObj.index, newDragObj)
      // }





      //
      // 从 SOURCE 中移入

      // 在桌子间移动
      if (dragObj.camp === Camps.DESK || dragObj.camp === Camps.ROOM) {
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
      return {
      }
    }
  });

  useEffect(() => {
    return () => {}
  })

  drag(drop(ref))

  const { isDragging } = collected
  const { handlerId, isOver } = dropCollector
  console.error(isOver, '??????????')
  const newStyle = {
    border: isOver ? '1px dotted #ff00ff' : ''
  }


  return (<div className={'desk' + (isDragging ? ' dragging' : '')}
               data-self-indexes={campIndexes + ',' + index}
               style={{ ...style, ...newStyle }} ref={ref}
               data-handler-id={handlerId}>
    {
      items.length ? items.map((o, i) => {
        //
        return o.type === Types.SNACK ? (<Snack key={i} index={i} prop={o} campIndexes={campIndexes + ',' + index}/>) :
          (o.type === Types.DESK ? (<Desk key={i} index={i} campIndexes={campIndexes + ',' + index} prop={o} onRoomUpdate={onRoomUpdate} />) :
            null)
        //
      }) : '桌子'
    }
  </div>)
  }
)
export default Desk
