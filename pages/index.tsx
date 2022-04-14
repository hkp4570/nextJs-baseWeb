import React, {ReactNode} from "react";
import {useRouter} from 'next/router';
import {TasksType, UsersType} from "../type/type";
import {getTasks, getUser} from "../services/global";
import {Card, List} from "antd";
import TaskCard from "../components/tasks/TaskCard";
import {PaginationProps} from "antd/es/pagination/Pagination";
import {ParsedUrlQuery} from "querystring";

interface IProps {
    children?: ReactNode,
    getUserAPI: () => Promise<UsersType>,
    tasks: TasksType[],
    user: UsersType,
    total: number,
}
interface Query extends ParsedUrlQuery {
    page?: string,
}

const filterParams: { pageNum: number, pageSize: number } = {pageNum: 1, pageSize: 6}
const Home = (props: IProps) => {
    const {tasks, user, total} = props;
    const Router = useRouter();
    const {query}: { query: Query } = Router;
    const pagination: PaginationProps = {
        current: Number(query.page) || 1,
        pageSize: 6,
        total,
        showTotal: (total: number) => `共 ${total} 个`,
        showSizeChanger: false,
        onChange: (page: number) => {
            filterParams.pageNum = page;
            Router.push({
                pathname: '/',
                query: {page}
            })
        },
    }
    return (
        <Card title={'热门任务'} bordered={false} style={{padding: 20}}>
            <List<TasksType>
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                size={'large'}
                dataSource={tasks}
                renderItem={item => (
                    <List.Item>
                        <TaskCard task={item} user={user}/>
                    </List.Item>
                )}
                pagination={pagination}
            />
        </Card>
    )
}

export async function getServerSideProps({query}: { query:Query }) {
    const page = Number(query.page) || 1;
    const tasks = await getTasks({pageNum: page});
    const user = await getUser();
    return {
        props: {
            tasks: tasks.tasks,
            total: tasks.total,
            user: user.data,
        },
    }
}

export default Home
