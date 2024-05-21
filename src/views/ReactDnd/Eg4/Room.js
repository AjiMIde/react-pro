import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types, { Camps } from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import DropUtils from "@views/ReactDnd/Eg4/DropUtils";
import _ from "lodash";
import Snack from './Snack'
import update from "immutability-helper";
import Desk from "@views/ReactDnd/Eg4/Desk";


const Room = memo((props) => {
  const {
    prop: { style = {}, desc = '', items = [], id:roomId },
    index, index: roomIndex,
    moveCard,
    onRoomUpdate,
    onDeskResize, onDeskDrop,
  } = props

  console.log('room ', index, 'render')

  const deskProp = { onDeskResize, onDeskDrop }

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: [Types.ROOM, Types.SNACK, Types.DESK],

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    drop: (dragObj, monitor) => {
      // 如果已经有程序处理了 drop 事件
      console.error(monitor.getDropResult(), '??????????')

      if (monitor.didDrop()) {
        return
      }
      if (dragObj.type === 'room') {
        return
      }


      const { left, top } = DropUtils.computedDropPos(ref.current, monitor)
      console.error(dragObj)

      const newDragObj = IhUpdate(dragObj, {
        style: { $merge: { left, top, position: 'absolute' } }
      })

      const targetIndexes = '' + roomIndex
      const fromIndexes = newDragObj.campIndexes || ''
      const dragObjIndex = (newDragObj.index === null || newDragObj.index === undefined) ? -1 : newDragObj.index

      onRoomUpdate(targetIndexes, fromIndexes, dragObjIndex, newDragObj)

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

  return (<div className={'room'}
               data-self-indexes={'' + index}
               style={{ ...style, ...draggingStyle }} data-handler-id={handlerId} ref={ref} >
    <div className={'room-desc'}>房间-{roomId}</div>
    {
      items.map((o, i) => {
        return o.type === Types.SNACK ?
          (<Snack key={i} index={i} campIndexes={roomIndex + ''} prop={o}/>) :
          (o.type === Types.DESK ?
            (<Desk key={i} index={i} campIndexes={roomIndex + ''} prop={o} {...deskProp} onRoomUpdate={onRoomUpdate} />) :
            null)
      })
    }
  </div>)
})

export default Room
