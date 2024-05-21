import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import { NativeTypes } from 'react-dnd-html5-backend';
import Snack from './Snack'

const Desk = memo((props) => {
    // <Desk key={i} index={i} id={o.id} items={o.items} updateDesks={updateDesks}/>
    const { index, id, items, updateDesks } = props
    const [contents, setContents] = useState([])
    const ref = useRef(null)

    console.log('desk ' + index + ' function  render')

    useEffect(() => {
      return () => {
      }
    }, [])

    // collector是一个对象，来源于 collect 方法的回参
    // drop 则为钩入一个 element，使 element 可 drop，应当使用 ref={drop} 或 drop(ref); ref={ref} 等方法
    // 如使用 drop(ref) 方法时，可使用 drag(drop(ref)) 来完成 drag/drop 事件的双重绑定
    const [dropCollector, drop] = useDrop(
      () => ({
        // 可为 string 或 数组 或函数（须返回 string/[string...])
        accept: ['snack', 'desk'],

        //
        options: {
          // 据说可以使用这个配置，来判断当前的 props 与之前的 props （或某个时段的 props)
          // 判断这个属性，以获取性能上的提升
          arePropsEqual: (props, otherProps) => {
          }
        },

        // 同样的，如果你想一直可 drop 则没有必要设置此
        // 相反，如果你想通过props 或 dragObj 来判断一些业务状态下返回 true/false，则非常合适
        // 同样的，你不能在此方法内调用 monitor.canDrop
        canDrop: (dragObj, monitor) => {
          return true
        },

        // drop 配置可能是 drop 方法中最高频的配置
        // dragObj 为 dragSource 中的 item
        // dropTargetMonitor 不同于 dragSourceMonitor 有着不同的方法
        drop: (dragObj, monitor) => {
          // console.log(dragObj, monitor)
          // 1. 通常来讲，如果你配置了 canDrop 并通过一些判断返回 false,则此方法不被调用
          // 2. 如果你有嵌套的 dropTarget，想象一个 drop 房间有个 drop 墙，上面有个 drop 桌子
          //    当 drop 桌子处理了一个 drop 事件，可以在此方法内调用
          //    monitor.didDrop() 来判断是否有 dropTarget 处理了 drop 事件，以做下一步业务的处理
          //    你还可以使用 monitor.getDropResult() 来做更复杂的判断，这非常重要！
          // 3. 同 dragSource 中的 endDrag，此方法内非常适合做 redux action !
          // 4. 此方法 return sth 而 sth 则会成为 dropResult() 的内容，注意不能返回 false，
          //    否则在嵌套的 dropTarget 中判断不了 didDrop() （当然你甚至可以利用这点来做复杂的业务）
          monitor.getInitialClientOffset()              // 开始drag时，指针相于window的位置信息 {x, y}
          monitor.getClientOffset()                     // dragging过程中，指针相于window的位置信息 {x, y}
          monitor.getInitialSourceClientOffset()        // 开始drag时，dragSource 相对于 window 的位置信息 {x, y}
          monitor.getDifferenceFromInitialOffset()      // 计算当前指针的位置信息与 dragSource 的**之前的位置**的差值 {x, y}，通常用这个值来计算box内的element移动量
          monitor.getSourceClientOffset()               // 结束drag时，dragSource 相对于 window 的位置信息 {x, y}

          console.log(dragObj)

          // setContents(contents.concat([dragObj.content]))
          if (dragObj.role === 'source') {
            // 计算父的位置，与当前 dragSource 的位置，来计算出 dragSource 在父中应该的位置

            const { x: fatherX, y: fatherY } = ref.current.getBoundingClientRect()
            const { x: pointX, y: pointY } = monitor.getSourceClientOffset() || { x: 0, y: 0 }
            const { scrollTop, scrollLeft } = window.document.documentElement
            const pad = 3 // 我也不知道
            const left = Math.round(pointX - fatherX + scrollLeft + pad)
            const top = Math.round(pointY - fatherY + scrollTop - pad - document.documentElement.scrollTop)

            updateDesks({
              action: 'add',
              deskIndex: index,
              value: {
                content: dragObj.content,
                position: 'absolute',
                left, top
              }
            })
          } else if (dragObj.role === 'child') {
            const { x: fatherX, y: fatherY } = ref.current.getBoundingClientRect()
            const { x: pointX, y: pointY } = monitor.getSourceClientOffset() || { x: 0, y: 0 }
            const { scrollTop, scrollLeft } = window.document.documentElement
            const pad = 3 // 我也不知道
            const left = Math.round(pointX - fatherX + scrollLeft + pad)
            const top = Math.round(pointY - fatherY + scrollTop - pad - document.documentElement.scrollTop)

            updateDesks({
              action: 'move',
              deskIndex: index,
              fromDeskIndex: dragObj.deskIndex,
              index: dragObj.index,
              value: {
                content: dragObj.content,
                position: 'absolute',
                left, top
              }
            })

          } else if (dragObj.name === 'desk') {
          }

          return {
            value: 'from drop source'
          }
        },

        // hover 事件，不同于 drop ，即使当前的 dropSource.canDrop() === false
        // 该事件一旦 hover 会频繁触发，适合用来做排序功能
        hover: (dragObj, monitor) => {

          if (!ref.current) {
            return;
          }

          if (dragObj.name === 'desk') {

            const dragIndex = dragObj.index
            const hoverIndex = index

            console.error(dragIndex, hoverIndex, '???')

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
              return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            // 被 hover 的对象在文档中的中间位置
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            // 指针相对于文档中的位置
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            // 如果是把列表上面的 item 排到下面的 item，但 指针位置还超过 hover 对象在文档中的中间位置，则返回
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
            }
            // Dragging upwards
            // 如果是把列表下面的 item 排到上面的 item，但 指针位置还没小于 hover 对象在文档中的中间位置，则返回
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
            }

            updateDesks({
              action: 'reorder',
              dragIndex, hoverIndex
            })

            dragObj.index = hoverIndex;

            // Time to actually perform the action
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.

            console.error(dragObj)

          }
        },


        // collect 返回一个对象，对象的内容对应着 useDrop 的回参的第一个参 collected
        collect: (monitor) => {
          // console.error(monitor.getItem())
          monitor.isOver()      // 是否有 dragSource over
          monitor.isOver({
            shallow: true  // true/false 利用这个属性来查看是否在嵌套的 dropTarget 上运行
          })
          monitor.canDrop()     // 查看当前的 dragSource 的 type 是否在 accept 的范围内
          return {
            isOver: !!monitor.isOver(),   // 是否被
          }
        }
      }), [updateDesks, props]
    )

    const [dragCollector, drag, dragPreview] = useDrag(() => ({
      type: 'desk',
      item: {
        name: 'desk',
        id,
        index
      },
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
    }), [updateDesks, props])

    const { isOver } = dropCollector
    const { isDragging } = dragCollector

  const style = {
      opacity: isDragging ? .3 : 1
  }

    drag(drop(ref))

    return (<div className={'desk-item' + (isOver ? ' over' : '')} ref={ref} id={'deskItem'} style={style}>
      { <div>{id}</div>}
      {
        items.map((o, i) => {
          return (<Snack key={i} deskIndex={index} index={i} style={o}>{o.content}</Snack>)
        })
      }
    </div>)
  }
)
export default Desk
