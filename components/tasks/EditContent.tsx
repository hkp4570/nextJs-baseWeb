import React from 'react';
import {Divider, Form, Input, Upload,DatePicker} from "antd";
import {TasksType} from "../../type/type";

const { RangePicker } = DatePicker;

interface IProps {
    detail: TasksType,
    form: any,
}

const EditContent = ({detail,form}:IProps) => {
    return (
        <Form
            form={form}
            labelCol={{ span: 5 }}
            autoComplete="off"
        >
            <Form.Item
                label="标题"
                name="title"
                initialValue={detail.title}
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="描述"
                name="description"
                initialValue={detail.desc}
                rules={[{ required: true, message: '请输入描述' }]}
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            <Form.Item
                label="封面"
                name="coverFiles"
            >
                <Upload>上传封面</Upload>
            </Form.Item>

            <Form.Item
                label="费用"
                name="payAmount"
                initialValue={detail.payAmount}
                rules={[{required: true, message:'请输入费用'}]}
            >
                <Input type={'number'} min={1} max={1000000}/>
            </Form.Item>

            <Form.Item
                label="开始-结束时间"
                name="time"
                rules={[{required: true, message:'请选择时间'}]}
            >
                <RangePicker/>
            </Form.Item>
            <Divider plain>以下内容完成任务后可见</Divider>

            <Form.Item
                label="文本"
                name="text"
                initialValue={detail.text}
                rules={[{required: true, message:'请输入文本'}]}
            >
                <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
                label="链接"
                name="link"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="凭证"
                name="auth"
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default EditContent;
