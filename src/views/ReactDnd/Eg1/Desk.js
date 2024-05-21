import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Types from "@views/ReactDnd/datas/Types";
import IhUpdate from 'immutability-helper'
import { NativeTypes } from 'react-dnd-html5-backend';

const Desk = memo((props) => {
    const [contents, setContents] = useState([])
    const ref = useRef(null)

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
        accept: 'snack',

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

          setContents(contents.concat([dragObj.content]))

          return {
            value: 'from drop source'
          }
        },

        // hover 事件，不同于 drop ，即使当前的 dropSource.canDrop() === false
        // 该事件一旦 hover 会频繁触发，适合用来做排序功能
        hover: (dragObj, monitor) => {
          // console.error(dragObj)
        },


        // collect 返回一个对象，对象的内容对应着 useDrop 的回参的第一个参 collected
        collect: (monitor) => {
          console.error(monitor.getItem())
          monitor.isOver()      // 是否有 dragSource over
          monitor.isOver({
            shallow: true  // true/false 利用这个属性来查看是否在嵌套的 dropTarget 上运行
          })
          monitor.canDrop()     // 查看当前的 dragSource 的 type 是否在 accept 的范围内
          return {
            isOver: !!monitor.isOver(),   // 是否被
          }
        }
      }), [contents]
    )

    const { isOver } = dropCollector

    drop(ref)

    return (<div className={'desk-item' + (isOver ? ' over' : '')} ref={ref} id={'deskItem'}>
      {
        contents.map((item, index) => (
          <div key={index}>{item}</div>
        ))
      }
    </div>)
  }
)
export default Desk
