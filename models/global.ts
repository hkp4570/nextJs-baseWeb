import {getTasks, login} from '../services/global'
import {Model} from 'dva-no-router';
import {TasksType, UsersType} from "../type/type";
import {ConnectState} from "./connect";

export interface GlobalModelState {
    userInfo: UsersType | object,
    tasks: TasksType[],
    newTasks: TasksType[],
}

interface GlobalModel extends Model {
    state: GlobalModelState,
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
            const response = yield call(login, payload);
            if (response.code === 0) {
                yield put({
                    type: 'setState',
                    payload: {userInfo: response.data}
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
        * setNewTask({payload}, {put}) {
            yield put({
                type: 'setState',
                payload,
            })
        },
        * editUserInfo({payload}, {put, select}) {
            const userInfo = yield select((state: ConnectState) => state.global.userInfo);
            const _userInfo = JSON.parse(JSON.stringify(userInfo));
            const newUserInfo = Object.assign(_userInfo, payload);
            // 需要修改mock里面的数据 这样列表的用户信息也会修改
            yield put({
                type: 'setState',
                payload: {
                    userInfo: newUserInfo
                }
            })
            return true;
        },
        * logout({_}, {put}) {
            yield put({
                type: 'setState',
                payload: {
                    userInfo: {}
                }
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
