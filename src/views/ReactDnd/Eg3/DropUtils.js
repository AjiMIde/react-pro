import update from 'immutability-helper'
import _ from 'lodash'

export default {
  /**
   * 检查当前是否可以进行 sort order
   * @param dragIndex {number} 拖动对象的位置 index
   * @param hoverIndex {number} hover对象的位置 index
   * @param hoverBoundingRect {object} hover对象的整体块矩阵信息，包括距文档顶部，左部的 top/left，及本身的 height/width
   * @param pointerPos {object} 指针当前的位置信息，包括距文档顶、左的 {x, y}
   *
   * @returns {boolean}
   */
  canISortOrder (dragIndex, hoverIndex, hoverBoundingRect, pointerPos) {
    if (dragIndex === hoverIndex) {
      return false
    }
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverClientY = pointerPos.y - hoverBoundingRect.top;

    // 从上往下拖动，指针未超过 hover source (ref.current) 的中间位置时，return
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return false
    }
    // 从上往上拖动，指针仍大于 hover source (ref.current) 的中间位置时，return
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return false
    }

    return true
  },

  /**
   * 将一个数组中的 sourceIndex 位置的元素放到 targetIndex 位置上，此方法不会影响原数组
   * @param ary {Array}
   * @param sourceIndex {Number}
   * @param targetIndex {Number}
   */
  swapList (ary, sourceIndex, targetIndex) {
    const sourceObj = ary[sourceIndex];
    return update(ary, {
      $splice: [
        [sourceIndex, 1],
        [targetIndex, 0, sourceObj],
      ],
    })
  },

  debounces: [],
  /**
   * 利用 _.debounce做一个防抖操作，这里要设计 fnName 以方便缓存 debounce 对象
   * @param fnName
   * @param fn
   * @param wait
   * @param option
   * @returns {DebouncedFunc<(...args: any) => any>}
   */
  setDebounce (fnName, fn, wait = 500, option = {}) {
    if (!fnName) {
      return _.debounce(fn, wait)
    } else {
      if (!this.debounces[fnName]) {
        console.log('set debount')
        this.debounces[fnName] = _.debounce(fn, wait)
      }
      return this.debounces[fnName]
    }
  },

  resizeObservers: {},

  /**
   * 通用的drop item 计算 left/top的方法，通过计算当前鼠标 point.x/y 减去父当前相对于文档的 boundingRect.x/y 得到最后相于对父的 left/y
   * @param fatherEle 父的element对象，通常为 ref.current
   * @param monitor dropMonitor
   * @returns {{top: number, left: number}}
   */
  computedDropPos(fatherEle, monitor) {
    const { x: fatherX, y: fatherY } = fatherEle.getBoundingClientRect()
    const { x: pointX, y: pointY } = monitor.getSourceClientOffset() || { x: 0, y: 0}
    const { scrollTop, scrollLeft } = window.document.documentElement
    const pad = 3 // 我也不知道
    const left = Math.round(pointX - fatherX + scrollLeft + pad)
    const top = Math.round(pointY - fatherY + scrollTop - pad)

    console.log(pointX, pointY, fatherX, fatherY, left, top)

    return { left, top }
  }
}
