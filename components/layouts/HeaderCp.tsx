import React from 'react'
import {Col, Row, Space, Tooltip} from 'antd'
import Link from 'next/link'
import {
    PlusOutlined
} from '@ant-design/icons'

function HeaderCp() {
    return (
        <Row justify={'space-between'}>
            <Row justify={'start'}>
                <Space>
                    <Col>
                        <Link href={'/'}>
                            <a>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={'/static/img/jwpay-100.png'} alt="logo"/>
                                <h1>及未支付</h1>
                            </a>
                        </Link>
                    </Col>
                    <Col>
                        <h1 className={'appH1'}>完整应用</h1>
                    </Col>
                </Space>
            </Row>
            <Col>
                <Space>
                    <Link href={'/task/pubList'}>
                        <a>
                            <Tooltip title="发布任务">
                                <PlusOutlined className={'plusIcon'} />
                            </Tooltip>
                        </a>

                    </Link>
                    <Link href={'/login'}>
                        <a className={'loginBtn'}>登录</a>
                    </Link>
                </Space>
            </Col>
            <style jsx>{`
              img {
                display: inline-block;
                width: 32px;
                height: 32px;
              }

              h1 {
                display: inline-block;
                color: ${process.env.primaryColor};
                line-height: 64px;
                font-size: 1.5rem;
                font-weight: 600;
                vertical-align: middle;
                cursor: pointer;
              }
              .appH1, .loginBtn{
                color: #121212;
                font-size: 1rem;
                font-weight: 400;
              }
              .appH1:hover, .loginBtn:hover{
                color: #d4380d;
              }
              :global(.plusIcon){
                font-size: 20px;
                vertical-align: middle;
              }
              :global(.plusIcon):hover{
                color: #d4380d;
              }
             
            `}</style>
        </Row>
    );
}


export default HeaderCp;
