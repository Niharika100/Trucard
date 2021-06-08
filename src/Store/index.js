import { createStore } from 'redux';

const UsersListReducer = async (state , action) => {
    if (action.type === 'loadData') {
        return {
            users: action.payload
        }
    }
    return state;
}

const store = createStore(UsersListReducer);

export default store;