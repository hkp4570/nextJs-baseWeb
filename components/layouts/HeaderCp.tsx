import React from 'react'
import {Row, Col} from 'antd'
import Link from 'next/link'

function HeaderCp() {
    return (
        <Row justify={'space-between'}>
            <Col>
                <Link href={'/'}>
                    <img src={'/static/img/jwpay-100.png'} alt="logo"/>
                </Link>
                <h1>及未支付</h1>
                <h1>完整应用</h1>
            </Col>
            <Col>+ 登录</Col>
        </Row>
    );
}


export default HeaderCp;
