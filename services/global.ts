import {http} from '../utils/request'
import {TasksType} from "../type/type";

interface TaskParamsType {
    pageNum?:number,
    pageSize?: number,
}
export function getUser() {
    return http('/getUser', {
        method: 'POST',
    })
}
export function getTasks(taskParams: TaskParamsType) {
    return http<API.TaskData<TasksType[]>>('/getTasks',{
        method: 'POST',
    })
}
