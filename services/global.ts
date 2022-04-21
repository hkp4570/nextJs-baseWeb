import {http} from '../utils/request'
import {CommentParamsType, CommentType, LoginParamsType, TasksType, UsersType} from "../type/type";

interface TaskParamsType extends API.SearchParams {
    id?: number,
}

export function login(loginParams:LoginParamsType) {
    return http<API.ResponseType<UsersType[]>>('/api/login', {
        method: 'POST',
        data: loginParams
    })
}

export async function getTasks(taskParams: TaskParamsType) {
    const {pageNum} = taskParams;
    const _t = await http<API.ResponseType<{ tasks: TasksType[], total?: number, }>>('/api/task', {
        method: 'POST',
    })
    const _d = _t.data.tasks;
    const _start: number = pageNum === 1 ? 0 : (pageNum! - 1) * 6;
    const _r = _d.slice(_start, _start + 6);
    return {
        tasks: _r,
        total: _t.data.total
    };
}

export function getTaskDetail(params: TaskParamsType) {
    return http<API.ResponseType<TasksType>>('/api/taskDetail', {
        method: 'POST',
        data: params,
    })
}

// 根据用户id和任务id获取对应的评论
export function getComment(params: CommentParamsType) {
    return http<API.ResponseType<CommentType[]>>('/api/comment', {
        method: 'POST',
        data: params,
    })
}
