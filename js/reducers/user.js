import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const initialState = Immutable({
    user: null,
    cpmkey: '',
    cpmsecret: ''
});


const setUser = (state, action) => ({
    ...state,
    cpmkey: action.cpmkey,
    cpmsecret: action.cpmsecret
});

const actionHandlers = {
    ['SET_USER']: setUser,
};

export default createReducer(initialState, actionHandlers);