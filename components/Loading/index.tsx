import React from 'react';
import {Spin, SpinProps} from "antd";

interface IProps extends SpinProps {
    children?: React.ReactNode
}

const Loading = ({children}: IProps) => {
    return (
        <Spin size={'large'} spinning={true} style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)'
        }}>
            {children}
        </Spin>
    );
};

export default Loading;
