declare namespace API {
    export interface ResponseStruct{
        code: number,
        msg: string
    }
    export interface TaskData<T> extends ResponseStruct {
        data: T
    }
}
