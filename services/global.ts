import {http} from '../utils/request'
import {TasksType, UsersType} from "../type/type";

interface TaskParamsType extends API.SearchParams{

}
export function getUser() {
    return http<API.ResponseType<UsersType[]>>('/api/user', {
        method: 'GET',
    })
}
export async function getTasks(taskParams: TaskParamsType) {
    console.log(taskParams,'taskParams')
    const { pageNum } = taskParams;
    const _t = await http<API.ResponseType<{ tasks:TasksType[], total?: number, }>>('/api/task',{
        method: 'POST',
    })
    const _d = _t.data.tasks;
    const _start:number = pageNum === 1 ? 0 : (pageNum! - 1) * 6;
    const _r = _d.slice(_start, _start+6);
    console.log(_r,'_r');
    return {
        tasks: _r,
        total: _t.data.total
    };
}
