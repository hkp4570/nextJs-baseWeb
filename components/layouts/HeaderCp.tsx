import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {Avatar, Col, Dropdown, Menu, Row, Space, Tooltip} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {
    PlusOutlined,
    LogoutOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import {ConnectState} from "../../models/connect";
import {UsersType} from "../../type/type";

function HeaderCp({userInfo, logoutAPI}: { userInfo?: UsersType, logoutAPI?: () => void }) {
    const router = useRouter();
    const logout = () => {
        logoutAPI!();
        router.replace('/');
    }
    const login = () => {
        // href={`/account/login?redirect=${router.asPath}`}
        if(!router.asPath.includes('login')){
            router.push(`/account/login?redirect=${router.asPath}`)
        }
    }
    const menu = (
        <Menu>
            <Menu.Item key={'information'}>
                <Link href="/account/information">
                    <a>
                        <ProfileOutlined/>
                        <span style={{paddingLeft: 8}}>个人资料</span>
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Item key={'logout'}>
                <a onClick={() => logout()}>
                    <LogoutOutlined/>
                    <span style={{paddingLeft: 8}}>退出登录</span>
                </a>
            </Menu.Item>
        </Menu>
    )
    return (
        <Row justify={'space-between'}>
            <Row justify={'start'}>
                <Space>
                    <Col>
                        <Link href={'/'}>
                            <a>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={'/static/img/jwpay-100.png'} alt="logo"/>
                                <h1>及未支付</h1>
                            </a>
                        </Link>
                    </Col>
                    <Col>
                        <h1 className={'appH1'}>完整应用</h1>
                    </Col>
                </Space>
            </Row>
            <Col>
                <Space>
                    <Link href={'/task/publish'}>
                        <a>
                            <Tooltip title="发布任务" placement={'bottom'}>
                                <PlusOutlined className={'plusIcon'}/>
                            </Tooltip>
                        </a>
                    </Link>
                    {
                        Object.keys(userInfo!).length ? (
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <a>
                                    <Avatar src={userInfo!.avatarFile.thumbUrls.small}/>
                                    <span style={{paddingLeft: 8}}>{userInfo!.username}</span>
                                </a>
                            </Dropdown>
                        ) : (<a className={'loginBtn'} onClick={() => login()}>登录</a>)
                    }
                </Space>
            </Col>
            <style jsx>{`
              img {
                display: inline-block;
                width: 32px;
                height: 32px;
              }

              h1 {
                display: inline-block;
                color: ${process.env.primaryColor};
                line-height: 64px;
                font-size: 1.5rem;
                font-weight: 600;
                vertical-align: middle;
                cursor: pointer;
              }

              .appH1, .loginBtn {
                color: #121212;
                font-size: 1rem;
                font-weight: 400;
              }

              .appH1:hover, .loginBtn:hover {
                color: #d4380d;
              }

              :global(.plusIcon) {
                font-size: 20px;
                vertical-align: middle;
              }

              :global(.plusIcon):hover {
                color: #d4380d;
              }

            `}</style>
        </Row>
    );
}

function mapStateToProps(state: ConnectState): any {
    return {
        userInfo: state.global.userInfo
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        logoutAPI: () => dispatch({type: 'global/logout'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCp);
