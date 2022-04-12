import {getTasks, getUser} from '../services/global'
import {Model} from 'dva-no-router';
import {TasksType, UsersType} from "../type/type";

export interface GlobalModelState  {
    userInfo: UsersType | object,
    tasks: TasksType[],
}
interface GlobalModel extends Model {
    state: GlobalModelState
}
const globalModel: GlobalModel = {
    namespace: 'global',
    state: {
        userInfo: {},
        tasks: [],
    },
    effects: {
        * getUserAPI(_, {call, put}) {
            const response = yield call(getUser);
            if (response.code === 0) {
                yield put({
                    type: 'setState',
                    payload: {userInfo: response.data}
                })
                return response.data;
            }
        },
        * getTaskAPI({payload},{call,put}){
            const response = yield call(getTasks, payload);
            if (response.code === 0) {
                yield put({
                    type: 'setState',
                    payload: {tasks: response.tasks}
                })
            }
        }
    },
    reducers: {
        setState(state, {payload}) {
            return {...state, ...payload};
        }
    }
}

export default globalModel;
