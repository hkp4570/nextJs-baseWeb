import React, {Dispatch, useEffect, useState} from 'react';
import Head from 'next/head';
import Link from "next/link";
import {useRouter} from "next/router";
import styled from 'styled-components';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {LoginParamsType, UsersType} from "../../type/type";
import {ConnectState} from "../../models/connect";
import Loading from '../../components/Loading';

const LoginWrapper = styled.div`
  width: 369px;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 36px auto;
`

interface IProps {
    login: (arg: LoginParamsType) => Promise<boolean>
    userInfo: UsersType
}

const Login = ({login, userInfo}: IProps) => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const router = useRouter();
    const handleSubmit = (values: any) => {
        try {
            login(values).then(res => {
                if (res) {
                    const {query} = router;
                    // @ts-ignore
                    router.replace(query.redirect);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if(Object.keys(userInfo).length){
            const {query} = router;
            // @ts-ignore
            router.replace(query.redirect);
        }else{
            setIsReady(true);
        }
    }, [router, userInfo])
    return (<div>
            {
                isReady ? <LoginWrapper>
                    <Head>
                        <title key="title">登录 - 及未支付</title>
                    </Head>
                    <Card title={'登录'}>
                        <Form
                            name="basic"
                            initialValues={{remember: true}}
                            onFinish={handleSubmit}
                            autoComplete="off"
                        >
                            <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]}>
                                <Input size={'large'} placeholder="用户名" prefix={<UserOutlined/>}/>
                            </Form.Item>

                            <Form.Item name="password" rules={[
                                {required: true, message: '请输入密码'},
                                {min: 6, max: 20, message: '密码长度必须是6-20位'}
                            ]}>
                                <Input.Password size={'large'} placeholder="密码" prefix={<LockOutlined/>}/>
                            </Form.Item>

                            <Form.Item>
                                <Button block type="primary" htmlType="submit">登录</Button>
                            </Form.Item>
                            <Row justify={'end'}>
                                <Col>
                                    没有账号?
                                    <Link href={'/account/register'}><a>注册一个</a></Link>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </LoginWrapper> : <Loading/>
            }
        </div>
    );
};

function mapStateToProps(state: ConnectState) {
    return {
        userInfo: state.global.userInfo
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        login: (payload: LoginParamsType) => dispatch({type: 'global/login', payload})
    }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Login);
