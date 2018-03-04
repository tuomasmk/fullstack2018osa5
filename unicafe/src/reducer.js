import {createStore} from 'redux'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      console.log('good called')
      return {...state, good: state.good + 1}
    case 'OK':
    console.log('ok called')
    return {...state, ok: state.ok + 1}
    case 'BAD':
    console.log('bad called')
    return {...state, bad: state.bad + 1}
    case 'ZERO':
    console.log('zero called')
      return {good: 0, ok: 0, bad: 0}
    case undefined:
      return state
  }
  return state
}

const store = createStore(counterReducer)

export default { counterReducer, store }
