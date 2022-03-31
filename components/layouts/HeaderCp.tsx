import React from 'react'
import styled from "styled-components"
import {Row, Col} from 'antd'
import Link from 'next/link'
const Img = styled.img`
  width: 32px;
  height: 32px;
`
function HeaderCp() {
    return (
        <Row justify={'space-between'}>
            <Col>
                <Link href={'/'}>
                    <Img src={'/static/img/jwpay-100.png'} alt="logo"/>
                </Link>
                <h1>及未支付</h1>
                <h1>完整应用</h1>
            </Col>
            <Col>+ 登录</Col>
        </Row>
    );
}


export default HeaderCp;
