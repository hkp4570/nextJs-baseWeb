import {getUser} from '../services/global'
import {Model} from 'dva-no-router';
import {UsersType} from "../type/type";

export interface GlobalModelState  {
    userInfo: UsersType | object
}
interface GlobalModel extends Model {
    state: GlobalModelState
}
const globalModel: GlobalModel = {
    namespace: 'global',
    state: {
        userInfo: {},
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
        }
    },
    reducers: {
        setState(state, {payload}) {
            return {...state, ...payload};
        }
    }
}

export default globalModel;
