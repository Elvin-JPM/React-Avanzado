import { createStore } from "redux";

// function createStore(reducer)
// {
//     let state;
//     let listeners = [];
//     function getState()
//     {
//         return state;
//     }

//     function dispatch(action)
//     {
//         state = reducer(state, action);
//         listeners.forEach(l => l());
//     }

//     function subscribe(listener)
//     {
//         listeners.push(listener);
//         return function ()
//         {
//             listeners = listeners.filter(l => !listener);
//         }
//     }

//     dispatch({ type: 'initialization' });

//     return {
//         getState,
//         subscribe,
//         dispatch
//     }
// }

const INCREMENT = "increment";
const DECREMENT = "cecrement";

//ACTION CREATOR

const increment = () => ({ type: INCREMENT });
const decrement = (payload) => ({ type: DECREMENT, payload });
// Creating reducer function (pure function)
// State is read-only
// So I can only dispatch actions in order to call the reducer
const reducer = (state = 0, action) => {
  //Implement state logic
  switch (action.type) {
    case INCREMENT:
      return state + (action.payload || 1);
    case DECREMENT:
      return state - (action.payload || 1);
    default:
      return state;
  }
};

//Creating a store
const store = createStore(reducer);

console.log({ store });

const callback = () => console.log(store.getState());
store.subscribe(callback);
callback();

store.dispatch(increment());
store.dispatch(decrement(5));
