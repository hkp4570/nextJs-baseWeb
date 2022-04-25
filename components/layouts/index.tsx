import React, {ReactNode, useEffect} from 'react';
import {connect} from "react-redux";
import Head from "next/Head";
import {Layout} from "antd";
import HeaderCp from './HeaderCp';
import FooterCp from "./FooterCp";
import {Dispatch} from "redux";

const {Header, Footer, Content} = Layout

function Layouts({
                     children,
                     login
                 }: { children: ReactNode, login: (arg: { username: string, password: string }) => boolean }) {
    // 并没有做登录token验证 默认是登录状态
    useEffect(() => {
        login({username: '123', password: '123456'});
    }, [login])
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header>
                <HeaderCp/>
            </Header>
            <Content>
                <Head>
                    <title key="title">及未支付 - 以任务的形式来完成支付</title>
                </Head>
                {children}
            </Content>
            <Footer>
                <FooterCp/>
            </Footer>
        </Layout>
    );
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        login: (payload: { username: string, password: string }) => dispatch({type: 'global/login', payload})
    }
}

// @ts-ignore
export default connect(null, mapDispatchToProps)(Layouts);
