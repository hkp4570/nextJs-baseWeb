import {http} from '../utils/request'
import {TasksType, UsersType} from "../type/type";

interface TaskParamsType extends API.SearchParams{

}
export function getUser() {
    return http<API.ResponseType<UsersType[]>>('/getUser', {
        method: 'POST',
    })
}
export async function getTasks(taskParams: TaskParamsType) {
    const { pageNum, pageSize } = taskParams;
    const _t = await http<API.ResponseType<{ tasks:TasksType[], total?: number, }>>('/getTasks',{
        method: 'POST',
    })
    const _d = _t.data.tasks;
    const _start:number = pageNum === 1 ? 0 : (pageNum! - 1) * pageSize!;
    const _r = _d.slice(_start, pageSize! + 1);
    return {
        tasks: _r,
        total: _t.data.total
    };
}
