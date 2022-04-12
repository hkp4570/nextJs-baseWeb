declare namespace API {
    export interface SearchParams {
        pageNum?: number;
        pageSize?: number;
    }
    export interface ResponseStruct{
        code: number,
        msg: string
    }
    export interface ResponseType<T> extends ResponseStruct {
        data: T,
    }
}
