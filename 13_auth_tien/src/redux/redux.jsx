import storage from 'redux-persist/lib/storage'

import { createStore } from 'redux'

const persistConfig = {
    key: 'root',
    storage,
  }

// const initState = 0;

// function reducer(state = initState, action){
//     switch(action.type){
//         case 'DEPOSIT':
//             return state + action.payload;
//         case 'WITHDRAW':
//             return state - action.payload;
//         default: 
//             return state
//     }
// }

const persistedReducer = persistReducer(persistConfig, reducer)

//store
const store = createStore(reducer)

console.log(store.getState())