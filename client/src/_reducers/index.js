import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
})

export default rootReducer;

//리듀서가 여러가지 있을 수 있다.
//state가 변하는걸 보여주고 값이 어떻게되는지 리턴해주는 것이 리듀서
//여러가지 state -> 여러가지 리듀서
//combineReducers를 통해 여러 리듀서를 루트 리듀서에서 하나로 합쳐준다.
