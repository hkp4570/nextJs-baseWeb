import React from 'react'
import {Col, Row, Space} from "antd"

const FooterCp = () => {
    return (
        <Row justify={'center'}>
            <Space>
                <Col>
                    <a href="mailto:colourful4570@gmail.com" target={'_blank'} rel="noreferrer">联系我们</a>
                </Col>
                <Col>
                    Copyright © 2018-2019 及未支付
                </Col>
            </Space>
        </Row>
    );
};

export default FooterCp;
