import React, {useState} from 'react';
import styled from 'styled-components';
import {
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Drawer,
    Form,
    FormInstance,
    Row,
    Skeleton,
    Space,
    Typography
} from 'antd';
import {useRouter} from "next/router";
import {getComment, getTaskDetail} from "../../services/global";
import Loading from "../../components/Loading";
import {CommentType, TasksType} from "../../type/type";
import moment from "moment";
import TaskCommentItem from "../../components/tasks/TaskCommentItem";
import EditContent from "../../components/tasks/EditContent";

interface IProps {
    taskDetail: TasksType,
    commentDetail: CommentType[],
}
const Bg = styled.div<{url:string}>`
  height: 320px;
  background-image: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DrawerFooter = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
`

const Detail = ({taskDetail,commentDetail}:IProps) => {
    const [visible,setVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const {user} = taskDetail;
    const router = useRouter();
    if(router.isFallback){
        return <Loading/>
    }
    const handleCloseDrawer = (type: 'ok'|'cancel') => {
        if(type === 'ok'){
           form.validateFields().then(value => {
               console.log(value,'value')
           }).catch(error => {
               console.log(error, '验证错误');
           })
        }else{
            setVisible(false)
        }
    }
    return (
        <div>
            <Bg url={taskDetail.coverFile.url}>
                <Typography.Title>{taskDetail.title}</Typography.Title>
                <Space size={30}>
                    <Button disabled>付费</Button>
                    <Button onClick={() => setVisible(true)}>编辑</Button>
                </Space>
            </Bg>
            <Row gutter={24} style={{padding:36}}>
                <Col span={16}>
                    <Card title={'任务详情'}>
                        <Descriptions column={2}>
                            <Descriptions.Item label="发布者">{user.username}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{moment(taskDetail.createdAt).format('YYYY-MM-DD')}</Descriptions.Item>
                            <Descriptions.Item label="开始时间">{moment(taskDetail.startAt).format('YYYY-MM-DD')}</Descriptions.Item>
                            <Descriptions.Item label="结束时间">{moment(taskDetail.stopAt).format('YYYY-MM-DD')}</Descriptions.Item>
                            <Descriptions.Item label="费用" span={2}>{taskDetail.payAmount}</Descriptions.Item>
                            <Descriptions.Item>{taskDetail.desc}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Divider/>
                    <Card title={'任务内容'}>
                        {taskDetail.status === 'pending' || taskDetail.text ?
                            <Skeleton loading={taskDetail.status === 'pending'} title={false} >
                                <Row>
                                    <Typography.Paragraph type="secondary">
                                        {taskDetail.text}
                                    </Typography.Paragraph>
                                </Row>
                            </Skeleton> :
                            null}

                        {taskDetail.status === 'pending' || taskDetail.link ?
                            <Row style={{ marginTop: 12 }}>
                                <Col span={3}>
                                    <p>链接</p>
                                </Col>
                                <Col span={21}>
                                    <Skeleton loading={taskDetail.status === 'pending'} title={false}>
                                        <Typography.Paragraph copyable={{ text: taskDetail.link }} style={{ marginBottom: 0 }}>
                                            <a href={taskDetail.link} target="_blank" rel="noreferrer">{taskDetail.link}</a>
                                        </Typography.Paragraph>
                                    </Skeleton>
                                </Col>
                            </Row> :
                            null}

                        {taskDetail.status === 'pending' || taskDetail.credentials ?
                            <Row style={{ marginTop: 12 }}>
                                <Col span={3}>
                                    <p>凭证</p>
                                </Col>
                                <Col span={21}>
                                    <Skeleton loading={taskDetail.status === 'pending'} title={false}>
                                        <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
                                            {taskDetail.credentials}
                                        </Typography.Paragraph>
                                    </Skeleton>
                                </Col>
                            </Row> :
                            null}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={'评论'}>
                        {commentDetail.map(comm => <TaskCommentItem key={comm.id} comment={comm}/>)}
                    </Card>
                </Col>
            </Row>
            <Drawer
                visible={visible}
                title={'编辑任务'}
                width={600}
                destroyOnClose
                onClose={() => handleCloseDrawer('cancel')}
            >
                <EditContent form={form} detail={taskDetail}/>
                {/*<Divider/>*/}
                <DrawerFooter>
                    <Space>
                        <Button onClick={() => handleCloseDrawer('cancel')}>取消</Button>
                        <Button type={'primary'} onClick={() => handleCloseDrawer('ok')}>确定</Button>
                    </Space>
                </DrawerFooter>
            </Drawer>
        </div>
    );
};

export default Detail;

export async function getStaticProps({params}: { params: { taskId: string } }) {
    const resp = await getTaskDetail({id: Number(params.taskId)});
    const comments = await getComment({taskId: Number(params.taskId), userId:resp.data.user.id});
    return {
        props: {
            taskDetail: resp.data,
            commentDetail: comments.data,
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
