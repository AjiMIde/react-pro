import React, { memo, useCallback, useState, useEffect, useRef, createContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import Bench from './Bench'
import Room from "@views/ReactDnd/Eg4/Room"
import '../Dnd.scss'
import DropUtils from "@views/ReactDnd/Eg4/DropUtils";
import _ from 'lodash'

window._ = _

let resizeObserver = null


const Eg = memo(() => {

  const clg = () => {
    console.log(rooms)
  }

  const [benches, setBenches] = useState([
    { id: 1, snacks: ['花生', '海带', '黄瓜'] },
    { id: 2, snacks: ['菠菜', '生菜', '花菜']},
    { id: 3, snacks: ['红烧肉', '排骨', '白切鸡'] },
    { id: 4, snacks: ['果汁', '椰汁', '可乐', '雪碧'] },
    { id: 5, desks: ['桌子'] },
  ])
  const [rooms, setRooms] = useState([
    { id: 1, desc: '11', style: { height: 100 }, items: [] },
    { id: 2, desc: '22', style: { height: 100 }, items: [] },
    { id: 3, desc: '33', style: { height: 300 }, items: [] },
  ])
  const ref = useRef(null)

  const moveBenches = useCallback((dragIndex, hoverIndex) => {
    setBenches(DropUtils.swapList(benches, dragIndex, hoverIndex))
  }, [benches]);

  const moveRooms = useCallback((dragIndex, hoverIndex) => {
    setRooms(DropUtils.swapList(rooms, dragIndex, hoverIndex))
  }, [rooms]);

  const onRoomResize = useCallback((roomIndex, height) => {
    const newData = update(rooms, {
      [roomIndex]: {
        style: {
          height: {
            $set: height
          }
        }
      }
    })
    setRooms(newData)
  }, [rooms])


  // todo 全新计划，继续加油！
  const changeIndexesToAry = (indexes) => {
    const ary = indexes.split(',').map(key => {
      return parseInt(key)
    })
    let i = 1
    while(i <= ary.length) {
      if (i % 2 === 1) {
        ary.splice(i, 0, 'items')
      }
      i += 1
    }
    return ary
  }

  // 全新的
  const onRoomUpdate = useCallback((targetIndexes, fromIndexes, dragObjectIndex = -1, dragObj) => {
    if (!targetIndexes) {
      return
    }

    const targetIndexesAry = changeIndexesToAry(targetIndexes)
    const fromIndexesAry = changeIndexesToAry(fromIndexes)
    const newRooms = _.cloneDeep(rooms)

    // 新增、父内移动，父外移动
    if (dragObjectIndex === -1) {
      delete dragObj.campIndexes
      delete dragObj.index

      _.get(newRooms, targetIndexesAry, []).push(dragObj)
    }
    // 父内移动
    else if (dragObjectIndex !== -1 && targetIndexes === fromIndexes) {
      _.set(newRooms, targetIndexesAry.concat('style'), dragObj.style)
      // Object.assign(newRoomsItem[dragObjectIndex].style, dragObj.style)
    }
    // 其他移动
    else {
      let fromFather = _.get(newRooms, fromIndexesAry)
      let targetFather = _.get(newRooms, targetIndexesAry)
      fromFather.splice(dragObjectIndex, 1)
      targetFather.push(dragObj)
    }

    setRooms(newRooms)
  }, [rooms])

  const onRoomItemDrop = useCallback((roomIndex, newItem) => {
    // const room = rooms[roomIndex]
    // newItem.index = room.items?.length || 0
    const newData = update(rooms, {
      [roomIndex]: {
        items: {
          $push: [newItem]
        }
      }
    })
    setRooms(newData)
  }, [rooms])

  const onRoomItemMove = useCallback((roomIndex, dragObjectIndex, newDragObj) => {
    const newData = update(rooms, {
      [roomIndex]: {
        items: {
          [dragObjectIndex]: {
            $set: newDragObj
          }
        }
      }
    })
    setRooms(newData)
  }, [rooms])

  const onRoomItemJump_old = useCallback((toRoomIndex, fromRoomIndex, dragObjectIndex, newDragObject) => {
    // const fromRoomIndex = rooms.findIndex(o => o.id === fromRoomId)
    // if (fromRoomIndex === -1) return console.error('maya~出错了, no from room index')

    // const newDragObject2 = update(newDragObject, {
    //   roomId: {
    //     $set: rooms[toRoomIndex].id
    //   }
    // })
    // console.error(toRoomIndex, fromRoomId, dragObjectIndex, newDragObject)

    const newData = update(rooms, {
      [fromRoomIndex]: {
        items: {
          $splice: [[dragObjectIndex, 1]]
        }
      },
      [toRoomIndex]: {
        items: {
          $push: [newDragObject]
        }
      }
    })
    setRooms(newData)
  }, [rooms])

  const onRoomItemJump= useCallback((dragObj) => {
    // const fromRoomIndex = rooms.findIndex(o => o.id === fromRoomId)
    // if (fromRoomIndex === -1) return console.error('maya~出错了, no from room index')

    // const newDragObject2 = update(newDragObject, {
    //   roomId: {
    //     $set: rooms[toRoomIndex].id
    //   }
    // })
    // console.error(toRoomIndex, fromRoomId, dragObjectIndex, newDragObject)

    const newData = update(rooms, {
      // [fromRoomIndex]: {
      //   items: {
      //     $splice: [[dragObjectIndex, 1]]
      //   }
      // },
      // [toRoomIndex]: {
      //   items: {
      //     $push: [newDragObject]
      //   }
      // }
    })
    setRooms(newData)
  }, [rooms])


  const onResize = (handlerData, selfIndexes, style = {}) => {
    let selfIndexesAry = changeIndexesToAry(selfIndexes)
    selfIndexesAry.pop()

    const newRooms = _.cloneDeep(rooms)
    const newRoomsItem = _.get(newRooms, selfIndexesAry)
    Object.assign(newRoomsItem.style, style)

    setRooms(newRooms)
  }


  const onDeskResize = useCallback((roomIndex, deskIndex, height, width) => {
    const newData = update(rooms, {
      [roomIndex]: {
        items: {
          [deskIndex]: {
            style: { $merge: { height, width } }
          }
        }
      }
    })
    setRooms(newData)
  }, [rooms])

  const onDeskDrop = useCallback((targetRoomIndex, targetDeskIndex, fromRoomIndex, fromDeskIndex, fromDragIndex, newDragObj) => {
    let newData = {}
    if (fromRoomIndex === -1 && fromDeskIndex === -1) { // 新加
      newData = update(rooms, {
        [targetRoomIndex]: {
          items: {
            [targetDeskIndex]: {
              items: {
                $push: [newDragObj]
              }
            }
          }
        }
      })
    } else if (fromRoomIndex === targetRoomIndex && fromDeskIndex === targetDeskIndex) { // 同房同桌移动
      newData = update(rooms, {
        [targetRoomIndex]: {
          items: {
            [targetDeskIndex]: {
              items: {
                [fromDragIndex]: {
                  $set: newDragObj
                }
              }
            }
          }
        }
      })
    } else if (fromDeskIndex === -1) { // 从房间中移动到桌子
      newData = update(rooms, {
        [fromRoomIndex]: {
          items: {
            $splice: [[fromDragIndex, 1]]
          }
        }
      })
      newData = update(newData, {
        [targetRoomIndex]: {
          items: {
            [targetDeskIndex]: {
              items: {
                $push: [newDragObj]
              }
            }
          }
        }
      })
    } else { // 移动
      newData = update(rooms, {
        [fromRoomIndex]: {
          items: {
            [fromDeskIndex]: {
              items: {
                $splice: [[fromDragIndex, 1]]
              }
            }
          }
        }
      })
      newData = update(newData, {
        [targetRoomIndex]: {
          items: {
            [targetDeskIndex]: {
              items: {
                $push: [newDragObj]
              }
            }
          }
        }
      })
    }
    setRooms(newData)
  }, [rooms])

  console.log('EG3, re render', rooms)

  useEffect(() => {
    let loadedTime = 0
    // 监听 resize
    const resizeFun = _.debounce(targets => {
      if (((new Date()).getTime() - loadedTime) < 1000) {
        // 在 resize observe 的情况下，有一种情况是，组件 render 后直接调用 此debounce 函数，这种情况下，不做任何处理
        // 组件因 render 引发 resize observe 的情况非常多，通常来讲判断在 1000ms 内是比较安全的
        // console.error((new Date()).getTime() - loadedTime)
        return
      }
      let {width, height} = targets[0].target.getBoundingClientRect()
      const selfIndexes = targets[0].target.getAttribute('data-self-indexes')
      width = Math.round(width)
      height = Math.round(height)
      console.error(selfIndexes, width, height)
      const style = { width, height }
      onResize(null, selfIndexes, style)
      // onItemResize(null, {roomIndex, wallIndex, brickIndex}, style)
      // todo 把 wall 的监听也加上，并去掉 room, wall 的内在监听 size
    }, 500)
    resizeObserver = new window.ResizeObserver(resizeFun)
    const observer = (eleAry) => {
      for (let i = 0; i < eleAry.length; i++) {
        resizeObserver.observe(eleAry[i])
      }
    }

    window.setTimeout(() => {
      loadedTime = (new Date()).getTime()
      const roomEle = ref.current.getElementsByClassName('room')
      observer(roomEle)
      const wallEle = ref.current.getElementsByClassName('desk')
      observer(wallEle)
    }, 100)

    return () => {
      resizeObserver.disconnect()
    }

  })




  return (<div className={'eg3'}>
      <div className="kitchen">
      <h4>厨房</h4>
      {
        benches.map((o, i) => (
            <Bench key={o.id} index={i} item={o} moveCard={moveBenches}/>
        ))
      }
    </div>
      <div className={'desk'} ref={ref}>
      <h4>餐厅</h4>
      {
        rooms.map((o, i) => (
          <Room key={o.id} index={i} prop={o}
                moveCard={moveRooms} onItemDrop={onRoomItemDrop} onItemMove={onRoomItemMove} onItemJump={onRoomItemJump}
                onRoomUpdate={onRoomUpdate}
                onDeskResize={onDeskResize} onDeskDrop={onDeskDrop}
          />
        ))
      }
    </div>
  </div>)
})




function Wrapper() {
  return (
    <div className={'eg1'}>
      <DndProvider backend={HTML5Backend}>
        <Eg/>
      </DndProvider>
    </div>
  )
}

export default Wrapper


