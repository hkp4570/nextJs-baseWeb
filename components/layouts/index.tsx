import React, {ReactNode} from 'react'
import { Layout } from "antd"
import HeaderCp from './HeaderCp'
import FooterCp from "./FooterCp"

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
            <Footer>
                <FooterCp/>
            </Footer>
        </Layout>
    );
}

export default Layouts;
