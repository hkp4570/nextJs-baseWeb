import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {Avatar, Button, Card, PageHeader, Upload} from 'antd';
import {ConnectState} from "../../models/connect";
import {connect} from "react-redux";
import {UsersType} from "../../type/type";
import {Dispatch} from "redux";
import styled from "styled-components";
import {UploadOutlined} from "@ant-design/icons";
import {UploadChangeParam} from "antd/es/upload/interface";

interface IProps {
    userInfo: UsersType,
    getUserAPI: () => void ,
}
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
const SetUpAvatar=styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
`
const Information = ({userInfo, getUserAPI}:IProps) => {
    console.log(userInfo, 'userinfo')
    const Router = useRouter();
    const handleBgUpload = (file:UploadChangeParam<unknown>) => {
        console.log(file)
    }
    useEffect(() => {
        getUserAPI();
    },[getUserAPI])
    return (
        <div>
            <PageHeader title={'个人资料'} onBack={() => Router.back()}/>
            <Card>
                <Bg coverUrl={userInfo.coverFile?.url ?? ''}>
                    <SetUpBg>
                        <Upload onChange={handleBgUpload}>
                            <Button icon={<UploadOutlined />}>设置背景</Button>
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
                            <Button icon={<UploadOutlined />}>设置头像</Button>
                        </Upload>
                    </SetUpAvatar>
                </Bg>
            </Card>
        </div>
    );
};
function mapStateToProps(state:ConnectState):any{
    return {
        userInfo: state.global.userInfo
    }
}
function mapDispatchToProps(dispatch:Dispatch<any>){
    return {
        getUserAPI: () => dispatch({type:'global/getUserAPI'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Information);
