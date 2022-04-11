import React, {ReactNode} from 'react';
import Head  from "next/Head";
import {Layout} from "antd";
import HeaderCp from './HeaderCp';
import FooterCp from "./FooterCp";

const {Header, Footer, Content} = Layout

function Layouts({children}: { children: ReactNode }) {
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

export default Layouts;
