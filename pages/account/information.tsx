import React, {Dispatch, useState} from 'react';
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {Avatar, Button, Card, Col, Divider, Input, PageHeader, Row, Space, Upload} from 'antd';
import {UsersType} from "../../type/type";
import styled from "styled-components";
import {UploadOutlined, EditOutlined} from "@ant-design/icons";
import {UploadChangeParam} from "antd/es/upload/interface";
import {ConnectState} from "../../models/connect";

interface IProps {
    userInfo: UsersType,
    editUserInfoAPI: (arg:EditParamsType) => Promise<boolean>,
}
interface EditParamsType {
    username?: string,
    password?: string,
    intro?: string,
}
type EditStatusType = 'normal' | 'username' | 'password' | 'intro';
const Bg = styled.div<{ coverUrl: string }>`
  height: 320px;
  margin-bottom: 24px;
  background-color: #fff2e8;
  background-image: url(${props => props.coverUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`
const SetUpBg = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`
const SetUpAvatar = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
const Information = ({userInfo, editUserInfoAPI}: IProps) => {
    const [editStatus, setEditStatus] = useState<EditStatusType>('normal');
    const [value, setValue] = useState<string>('');
    const Router = useRouter();
    const handleBgUpload = (file: UploadChangeParam<unknown>) => {
        console.log(file)
    }

    const editUserInfo = (type: EditStatusType) => {
        setEditStatus(type);
    }
    const handleSubmit = (type: 'ok' | 'cancel') => {
        if (type === 'ok') {
            editUserInfoAPI({[editStatus]:value}).then(res => {
                if(res){
                    setEditStatus('normal');
                }
            })
        } else {
            setEditStatus('normal')
        }
    }
    const renderEditContent = () => {
        const _userInput = <Input
            style={{width: 369}}
            allowClear
            onChange={e => setValue(e.target.value)}
            onPressEnter={() => handleSubmit('ok')}
        />
        const _passInput = <Input.Password
            onChange={e => setValue(e.target.value)}
            onPressEnter={() => handleSubmit('ok')}
        />
        const _introInput = <Input.TextArea
            rows={3}
            onChange={e => setValue(e.target.value)}
            onPressEnter={() => handleSubmit('ok')}
        />

        return <div>
            {{
                'username': _userInput,
                'password': _passInput,
                'intro': _introInput,
                'normal': '',
            }[editStatus]}
            <div className="submit" style={{marginTop: 12}}>
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSubmit('ok')}
                    >
                        提交
                    </Button>
                    <Button onClick={() => handleSubmit('cancel')}>取消</Button>
                </Space>
            </div>
        </div>
    }

    return (
        <div>
            <PageHeader title={'个人资料'} onBack={() => Router.back()}/>
            <Card>
                <Bg coverUrl={userInfo.coverFile?.url ?? ''}>
                    <SetUpBg>
                        <Upload onChange={handleBgUpload}>
                            <Button icon={<UploadOutlined/>}>设置背景</Button>
                        </Upload>
                    </SetUpBg>
                    <SetUpAvatar>
                        <Avatar
                            icon={'user'}
                            src={userInfo.avatarFile?.url}
                            size={100}
                        />
                        <br/>
                        <Upload onChange={handleBgUpload}>
                            <Button icon={<UploadOutlined/>}>设置头像</Button>
                        </Upload>
                    </SetUpAvatar>
                </Bg>
                <Row gutter={24}>
                    <Col span={24}>
                        用户名：
                        {
                            editStatus === 'username' ? (renderEditContent()) : (<Space>
                                <span>{userInfo.username}</span>
                                <EditOutlined style={{cursor: 'pointer'}} onClick={() => editUserInfo('username')}/>
                            </Space>)
                        }

                    </Col>
                    <Divider/>
                    <Col span={24}>
                        密码：
                        {
                            editStatus === 'password' ? (renderEditContent()) : (<Space>
                                <span>******</span>
                                <EditOutlined style={{cursor: 'pointer'}} onClick={() => editUserInfo('password')}/>
                            </Space>)
                        }

                    </Col>
                    <Divider/>
                    <Col span={24}>
                        自我介绍：
                        {
                            editStatus === 'intro' ? (renderEditContent()) : (<Space>
                                <span>{userInfo.intro}</span>
                                <EditOutlined style={{cursor: 'pointer'}} onClick={() => editUserInfo('intro')}/>
                            </Space>)
                        }
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

function mapStateToProps(state: ConnectState): any {
    return {
        userInfo: state.global.userInfo
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        editUserInfoAPI: (payload:EditParamsType) => dispatch({type: 'global/editUserInfo', payload})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Information);
