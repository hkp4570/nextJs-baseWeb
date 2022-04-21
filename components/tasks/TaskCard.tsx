import React from 'react';
import styled from 'styled-components';
import {TasksType} from "../../type/type";
import {Card, Col, Row, Tooltip, Typography, Avatar, Space} from "antd";
import Link from "next/link";
import moment from "moment";

const Bg = styled.div<{$url:string}>`
  width: 100%;
  height: 147px;
  background-image: url(${props => props.$url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`
// ? background-color: 有一个默认覆盖不掉的样式 不知道为啥
const BgContent = styled.div`
  position: absolute;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background: rgba(0,0,0,0.2);
  left: 0;
  bottom: 0;
`
const TaskCard = ({task}:{task:TasksType}) => {
    const renderLinkTitle = (title:string) => {
        return <Link href={`/task/${task.id}`}><a>{title}</a></Link>
    }
    return (
        <Card title={renderLinkTitle(task.title)}>
            <Bg $url={task.coverFile.url}>
                <BgContent>
                    <Tooltip title={task.desc} placement={'bottom'}>
                        <Typography.Text ellipsis>{task.desc}</Typography.Text>
                    </Tooltip>
                </BgContent>
            </Bg>
            <Row justify={'space-between'} style={{marginTop:10}}>
                <Row justify={'start'} align={'middle'}>
                    <Tooltip title={'发布者'}>
                        <Space>
                            <Col>
                                <Avatar size={24} src={task.user.avatarFile.url}/>
                            </Col>
                            <Col><Link href={`/user/detail/?id=${task.id}&pageNum=1`}><a>{task.user.username}</a></Link></Col>
                        </Space>
                    </Tooltip>
                </Row>
                <Col>
                    <Tooltip title={'发布时间'}>
                        {moment(task.createdAt).format('YYYY-MM-DD')}
                    </Tooltip>
                </Col>
            </Row>
        </Card>
    );
};

export default TaskCard;
