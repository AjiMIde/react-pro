import React, { memo, useCallback, useState, useEffect, createContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import Bench from './Bench'
import Room from "@views/ReactDnd/Eg3/Room"
import '../Dnd.scss'
import DropUtils from "@views/ReactDnd/Eg3/DropUtils";

window.up = update

const Eg3 = memo(() => {

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
    {
      id: 3, desc: '33', style: { height: 300 }, items: [
        //
        {
          camp: "room",
          content: "",
          items: [],
          style: {width: 134, height: 124, left: 23, top: 30},
          type: "desk",
        }
        //
      ]
    },
  ])

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

  const onRoomItemJump = useCallback((toRoomIndex, fromRoomIndex, dragObjectIndex, newDragObject) => {
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

  return (<div className={'eg3'}>
      <div className="kitchen">
      <h4>厨房</h4>
      {
        benches.map((o, i) => (
            <Bench key={o.id} index={i} item={o} moveCard={moveBenches}/>
        ))
      }
    </div>
      <div className={'desk'}>
      <h4>餐厅</h4>
      {
        rooms.map((o, i) => (
          <Room key={o.id} index={i} prop={o} onRoomResize={onRoomResize}
                moveCard={moveRooms} onItemDrop={onRoomItemDrop} onItemMove={onRoomItemMove} onItemJump={onRoomItemJump}
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
        <Eg3/>
      </DndProvider>
    </div>
  )
}

export default Wrapper


