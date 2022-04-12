import React from 'react';
import Head from 'next/head';
import Link from "next/link";
import styled from 'styled-components';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const LoginWrapper = styled.div`
  width: 369px;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 36px auto;
`
const Login = () => {
    const handleSubmit = (values: any) => {
        console.log(values,'values')
    }
    return (
        <LoginWrapper>
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
                        {min:6, max:20, message: '密码长度必须是6-20位'}
                    ]}>
                        <Input.Password size={'large'} placeholder="密码" prefix={<LockOutlined/>}/>
                    </Form.Item>

                    <Form.Item >
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
        </LoginWrapper>
    );
};

export default Login;
