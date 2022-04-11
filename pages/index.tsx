import React, {ReactNode} from "react";
import styled from 'styled-components';
import {TasksType, UsersType} from "../type/type";
import {getTasks, getUser} from "../services/global";
import {Card, List} from "antd";
import TaskCard from "../components/tasks/TaskCard";

const H1 = styled.h1`
  color: aqua;
`

interface IProps {
    children?: ReactNode,
    getUserAPI: () => Promise<UsersType>,
    tasks: TasksType[],
    user: UsersType[],
    total: number,
}

const Home = (props: IProps) => {
    const {tasks, user, total} = props;
    const pagination = {
        current: 1,
        pageSize: 6,
        total,
        showTotal: (total:number) => `共 ${total} 个`,
        // onChange: this.onPageChange,
    }
    return (
        <Card title={'热门人物'} bordered={false} style={{padding: 20}}>
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
                        <TaskCard task={item} user={user} />
                    </List.Item>
                )}
                pagination={pagination}
            />
        </Card>
    )
}

// function mapStateToProps(state: ConnectState) {
//     return {
//         userInfo: state.global.userInfo
//     }
// }
//
// function mapDispatchToProps(dispatch:Dispatch<any>) {
//     return {
//         getUserAPI: () => dispatch({type: 'global/getUserAPI'})
//     }
// }

export async function getServerSideProps() {
    const tasks = await getTasks({});
    const user = await getUser();
    return {
        props: {
            tasks: tasks.data.tasks,
            total: tasks.data.total,
            user: user.data[1],
        },
    }
}

export default Home
