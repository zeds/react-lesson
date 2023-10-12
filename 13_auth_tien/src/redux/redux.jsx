import { createStore } from 'redux'

const initState = 0;

function reducer(state = initState, action){
    switch(action.type){
        case 'DEPOSIT':
            return state + action.payload;
        case 'WITHDRAW':
            return state - action.payload;
        default: 
            return state
    }
}
//store
const store = createStore(reducer)

console.log(store.getState())