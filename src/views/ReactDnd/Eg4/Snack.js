import React, { useEffect, useCallback, memo } from "react";
import { useDrag } from 'react-dnd'
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend'
import Types, { Camps } from "@views/ReactDnd/datas/Types";


const Snack = memo((props) => {
  const { prop, index, campIndexes  } = props
  const { style = {}, content = '' } = prop
  const selfIndexes = campIndexes + ',' + index

  // collected是一个对象，来源于 collect 方法的回参
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: Types.SNACK,
    item: {
      ...prop,
      type: Types.SNACK,
      campIndexes: '' + campIndexes,
      index
    },
    // item: dragObject，对应 useDrag.item 设置
    // 通常会在 end 这个方法内使用 monitor.getDropResult()
    end: (item, monitor) => {
      // const dropResult = monitor.getDropResult();
      // console.log('snack drag end: ', item, monitor.getDropResult())
    },
    collect: (monitor) => {
      // console.log(monitor)
      // 必须返回一个 object，包含一些计算好的内容以供使用
      return {
        isDragging: !!monitor.isDragging(),
      }
    }
  }), [props])

  const { isDragging } = collected
  // console.log(collected, drag, dragPreview)

  useEffect(() => {
  }, []);
  return (<div className={'snack' + (isDragging ? ' dragging' : '')}
               style={{...style }} ref={drag} data-self-indexes={selfIndexes}>
    {content}
  </div>)
})

export default Snack
