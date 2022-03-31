import React, {ReactNode} from 'react'
import { Layout } from "antd"
import HeaderCp from './HeaderCp';

const {Header, Footer, Content} = Layout

function Layouts({children}:{children:ReactNode}) {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header>
                <HeaderCp/>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer>footer</Footer>
        </Layout>
    );
}

export default Layouts;
