import { createStore, combineReducers } from 'redux';

const initState = {
  currentTime: (new Date()).toString()
}

const actionType = {
  updateTime: 'updateTime'
}

const Store = createStore((state = initState, action) => {
  switch (action.type) {
    case actionType.updateTime:
      state.currentTime = (new Date()).toString()
      break
    default:
      break
  }

  return state
})



export default Store
