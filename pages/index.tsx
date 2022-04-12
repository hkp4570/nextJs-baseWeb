import React, {ReactNode} from "react";
import {TasksType, UsersType} from "../type/type";
import {getTasks, getUser} from "../services/global";
import {Card, List} from "antd";
import TaskCard from "../components/tasks/TaskCard";
import {PaginationProps} from "antd/es/pagination/Pagination";

interface IProps {
    children?: ReactNode,
    getUserAPI: () => Promise<UsersType>,
    tasks: TasksType[],
    user: UsersType,
    total: number,
}
// TODO: 切换分页
const filterParams: { pageNum: number, pageSize: number } = {pageNum: 1, pageSize: 6}
const Home = (props: IProps) => {
    const {tasks, user, total} = props;
    const pagination:PaginationProps = {
        current: filterParams.pageNum,
        pageSize: filterParams.pageSize,
        total,
        showTotal: (total: number) => `共 ${total} 个`,
        showSizeChanger: false,
        onChange: (page: number) => {
            filterParams.pageNum = page;
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

// function mapStateToProps(state) {
//     return {
//         // tasks: state.global.tasks
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         getUserAPI: () => dispatch({type: 'global/getUserAPI'}),
//         getTaskAPI: payload => dispatch({type:'global/getTaskAPI',payload})
//     }
// }

export async function getServerSideProps() {
    const tasks = await getTasks({pageNum: 1, pageSize: 6});
    const user = await getUser();
    return {
        props: {
            tasks: tasks.tasks,
            total: tasks.total,
            user: user.data[1],
        },
    }
}

export default Home
