import React from 'react';
import {useRouter} from "next/router";
import {getComment, getTaskDetail, getTasks} from "../../services/global";
import {CommentType, TasksType} from "../../type/type";
import styled from "styled-components";
import {Avatar, Card, Col, List, Row, Typography} from "antd";
import TaskCard from "../../components/tasks/TaskCard";
import TaskCommentItem from '../../components/tasks/TaskCommentItem';
import {PaginationProps} from "antd/es/pagination/Pagination";
import {connect} from "react-redux";
// import {ConnectState} from "../../models/connect";
import {getOrCreateStore} from "../../dva";

interface IProps {
    taskDetail: TasksType,
    newTasks: TasksType[],
    total: number,
    comments: CommentType[],
    getNewTask: (arg: { pageNum: number }) => void;
}

const DetailBg = styled.div<{ url: string }>`
  height: 320px;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`
let pageNum: number;
const Detail = (props: IProps) => {
        const {newTasks, total, taskDetail: {user}, comments} = props;
        const router = useRouter();
        const pagination: PaginationProps = {
            current: pageNum || 1,
            pageSize: 6,
            total,
            showTotal: (total: number) => `共 ${total} 个`,
            showSizeChanger: false,
            onChange: (page: number) => {
                pageNum = page;
                const {query} = router;
                router.push(`/user/detail/?id=${query.id}&pageNum=${page}`)
            }
        }
        return (
            <div>
                <DetailBg url={user.coverFile.url}>
                    <div style={{textAlign: 'center'}}>
                        <Avatar icon="user" src={user.avatarFile.url} size={100}/>
                        <Typography.Title level={3}>{user.username}</Typography.Title>
                        <Typography.Text type="secondary">{user.intro}</Typography.Text>
                    </div>
                </DetailBg>

                <Row gutter={24} style={{padding: 24}}>
                    <Col span={16}>
                        <Card title={'最新任务'}>
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
                                dataSource={newTasks}
                                renderItem={item => (
                                    <List.Item>
                                        <TaskCard task={item}/>
                                    </List.Item>
                                )}
                                pagination={pagination}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={'评价'}>
                            <List
                                dataSource={comments}
                                renderItem={comment => (
                                    <TaskCommentItem comment={comment}/>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
            ;
    }
;

// function mapStateToProps(state: ConnectState) {
//     return {
//         newTasks: state.global.newTasks,
//     }
// }
//
// function mapDispatchToProps(dispatch: Dispatch<any>) {
//     return {
//         getNewTask: (payload: { pageNum: number }) => dispatch({type: 'global/getNewTask', payload})
//     }
// }

export default connect(null, null)(Detail);

export async function getServerSideProps({query}: { query: { id?: string, pageNum: string } }) {
    const store = getOrCreateStore({});
    const taskDetail = await getTaskDetail({id: Number(query.id)});
    const newTasks = await getTasks({pageNum: Number(query.pageNum) || 1});
    const comments = await getComment({userId: taskDetail.data.user.id, taskId: taskDetail.data.id});
    await store.dispatch({
        type: 'global/setNewTask',
        payload: {
            newTasks: newTasks.tasks,
        }
    })
    return {
        props: {
            taskDetail: taskDetail.data,
            // _initialState: store.getState(),
            newTasks: newTasks.tasks,
            total: newTasks.total,
            comments: comments.data,
        }
    }
}
