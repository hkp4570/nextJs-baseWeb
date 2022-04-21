import {getTasks, login} from '../services/global'
import {Model} from 'dva-no-router';
import {TasksType, UsersType} from "../type/type";

export interface GlobalModelState {
    userInfo: UsersType | object,
    tasks: TasksType[],
    newTasks: TasksType[],
}

interface GlobalModel extends Model {
    state: GlobalModelState
}

const globalModel: GlobalModel = {
    namespace: 'global',
    state: {
        userInfo: {},
        tasks: [], // 热门任务
        newTasks: [], // 最新任务
    },
    effects: {
        * login({payload}, {call, put}) {
            const response = yield call(login,payload);
            if(response.code === 0){
                yield put({
                    type: 'setState',
                    payload:{ userInfo: response.data }
                })
                return true;
            }
            throw new Error(response.msg);
        },
        * getTaskAPI({payload}, {call, put}) {
            const response = yield call(getTasks, payload);
            if (response.code === 0) {
                yield put({
                    type: 'setState',
                    payload: {tasks: response.tasks}
                })
            }
        },
        * saveUser({payload}, {put}) {
            yield put({
                type: 'setState',
                payload: {userInfo: payload}
            })
        },
        * getNewTask({payload}, {call, put}) {
            const response = yield call(getTasks, payload);
            if (response.code === 0) {
                yield put({
                    type: 'setState',
                    payload: {newTasks: response.tasks}
                })
            }
        },
        * setNewTask({payload}, {put}){
            yield put({
                type: 'setState',
                payload,
            })
        }
    },
    reducers: {
        setState(state, {payload}) {
            return {...state, ...payload};
        }
    }
}

export default globalModel;
