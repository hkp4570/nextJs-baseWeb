import React from 'react';
import {useRouter} from "next/router";
import {getTaskDetail} from "../../services/global";
import Loading from "../../components/Loading";
import {TasksType} from "../../type/type";

interface IProps {
    taskDetail: TasksType
}
const Detail = ({taskDetail}:IProps) => {
    console.log(taskDetail, 'taskDetail');
    const router = useRouter();
    if(router.isFallback){
        return <Loading/>
    }
    return (
        <div>
            任务详情
        </div>
    );
};

export default Detail;

export async function getStaticProps({params}: { params: { taskId: string } }) {
    console.log(params,'params')
    const resp = await getTaskDetail({id: Number(params.taskId)});
    console.log(resp,'resp')
    return {
        props: {
            taskDetail: resp.data
        }
    }
}

// fallback 当没有匹配到静态页面时需要做什么
export async function getStaticPaths() {
    // mock的数据有四个id 只返回两个id 也就是只生成两个静态页面
    return {
        paths: [{params: {taskId: '1'}}, {params: {taskId: '2'}}],
        fallback: true,
    }
}
