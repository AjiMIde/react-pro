import React, { useEffect, memo } from "react";
import { useDrag } from 'react-dnd'


const Snack = memo((props) => {
    const { children } = props

    console.log('snack function render')

    useEffect(() => {
      console.log('snack effect render ')
      return () => {
        console.log('snack effect un render')
      }
    }, [children])

    // collected是一个对象，来源于 collect 方法的回参
    const [collector, drag, dragPreview] = useDrag(() => ({
      type: 'snack',
      beginDrag: () => {
        return {
          aji: 'ajiiii'
        }
      },
      item: {
        name: 'snack',
        content: children,
      },

      options: {
      },

      end: (item, monitor) => {
        // item: dragSource.item 设置
        // monitor.getDropResult() 通常如果要处理 drop 事件，会在 end 中处理 getDropResult 对象
      },

      collect: (monitor, props) => {
        // console.log(monitor)
        // 必须返回一个 object，包含一些计算好的内容以供使用
        monitor.isDragging()    // true/false
        monitor.canDrag()       // true/false
        monitor.getItemType()   // 返回 dragSource的 type
        monitor.getItem()       // 返回 item 内容
        monitor.getDropResult() // drop target 处理完 drop 后返回的内容
        monitor.didDrop()       // 是否已经有程序处理了 drop 事件
        console.error()
        return {
          isDragging: !!monitor.isDragging(),
        }
      }
    }), [])

    const { isDragging } = collector
    // console.log( collector, drag, dragPreview)

    const cls = 'snack'
    + (isDragging ? ' dragging' : '')

  return (<div className={cls} ref={drag}>
      {children}
    </div>)
  }
)
export default Snack
