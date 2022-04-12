import React, {useState} from 'react';
import Head from 'next/head';
import Link from "next/link";
import styled from 'styled-components';
import {Button, Card, Divider, Form, Input} from "antd";

const RegisterWrapper = styled.div`
  width: 369px;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 36px auto;
`
const Register = () => {
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const handleSubmit = (values:any) => {
        console.log(values,'values')
    }
    const handleFieldsChange = () => {
        console.log('shi bai')
    }

    return (
        <RegisterWrapper>
            <Head>
                <title key="title">注册 - 及未支付</title>
            </Head>
            <Card title={'注册'}>
                <Form
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={handleSubmit}
                    onValuesChange={handleFieldsChange}
                    autoComplete="off"
                >
                    <Form.Item name="username" rules={[
                        {required: true, message: '请输入用户名'},
                        {min:2, max:20, message: '请输入用户名'}
                    ]}>
                        <Input size={'large'} placeholder="用户名"/>
                    </Form.Item>

                    <Form.Item name="password" rules={[
                        {required: true, message: '请输入密码'},
                        {min:6, max:20, message: '密码长度必须是6-20位'}
                    ]}>
                        <Input.Password size={'large'} placeholder="密码"/>
                    </Form.Item>
                    <Divider/>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block disabled={btnDisabled}>注册</Button>
                    </Form.Item>
                </Form>
            </Card>
        </RegisterWrapper>
    );
};

export default Register;

