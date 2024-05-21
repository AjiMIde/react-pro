import { createStore, combineReducers } from 'redux';

const age = (state = 18, action) => {
  switch (action.type) {
    case 'add':
      return state + action.value
    case 'cut':
      return state - action.value
    default:
      return state
  }
}

const sex = (state = 'man', action) => {
  switch (action.type) {
    case 'man':
      return 'man'
    case 'woman':
      return 'woman'
    default:
      return state
  }
}

const Store = createStore(combineReducers({
  age, sex
}))



export default Store
