import React, {ReactNode} from "react";
import styled from 'styled-components';
import {TasksType, UsersType} from "../type/type";
import {getTasks, getUser} from "../services/global";

const H1 = styled.h1`
  color: aqua;
`

interface IProps {
    children?: ReactNode,
    getUserAPI: () => Promise<UsersType>,
    tasks: TasksType[],
    user: UsersType[],
}

const Home = (props: IProps) => {
    const {tasks, user} = props;
    console.log(tasks, 'tasks')
    console.log(user, 'user')
    return (
        <div>
            <H1>及未支付</H1>
        </div>
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
            tasks,
            user,
        },
    }
}

export default Home
