import React, { memo, useCallback, useState, useEffect, useRef } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import Snack from './Snack'
import Desk from './Desk'
import Types, { Camps } from '../datas/Types'

const Bench = memo((props) => {
  const { index = '0', moveCard, item = {} } = props
  const { snacks, desks } = item

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: Types.BENCH,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover: function (item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // console.log(dragIndex, hoverIndex)

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
      // 从上往下拖动，指针未超过 hover source (ref.current) 的中间位置时，return
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      // 从上往上拖动，指针仍大于 hover source (ref.current) 的中间位置时，return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 其余情况 moveCard
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: Types.BENCH,
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    // console.log('bench re render ' + index)
  })

  drag(drop(ref))

  let style = isDragging ? { opacity: 0.1 } : { opacity: 1 }

  return (<div className="bench" ref={ref} data-handler-id={handlerId} style={style}>
    <div className={'bench-desc'}>{'工作台-' + (isDragging ? 'ddd' : '') + item.id}</div>
    {
      snacks && snacks.map(o => {
        const prop = {
          camp: Camps.SOURCE,
          content: o,
          style: {}
        }
        return ( <Snack prop={prop}/> )
      })
    }
    {
      desks && desks.map((o, i) => {
        const prop = {
          camp: Camps.SOURCE,
          content: '',
          style: {
            width: 50, height: 50
          },
          items: []
        }
        return ( <Desk key={i} prop={prop}/>)
      })
    }
  </div>)
})

export default Bench
