import { createStore } from 'redux';

// reducer to update the state
const UsersListReducer = async (state , action) => {
   
    // dispatch({ type: 'loadData', payload: userList })
    if (action.type === 'loadData') {
        return {
            users: action.payload
        }
    }
    return state;
}

// create redux store
const store = createStore(UsersListReducer);

export default store;
