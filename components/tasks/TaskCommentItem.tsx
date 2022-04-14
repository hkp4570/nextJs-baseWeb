import React from 'react';
import {Avatar, Comment} from "antd";
import {CommentType} from "../../type/type";
import {HeartOutlined} from "@ant-design/icons";
import moment from "moment/moment";

const TaskCommentItem = ({comment}: { comment: CommentType }) => {
    return (
        <Comment
            avatar={<Avatar icon="user" src={comment.user.avatarFile.thumbUrls.small}/>}
            author={<span>
                <span>{comment.user.username}</span>
                <span style={{marginLeft: 8}}>
                    {(comment.score / 10).toFixed(1)}
                    <HeartOutlined color={'#fadb14'} style={{marginLeft: 4}}/>
                </span>
            </span>}
            content={comment.text}
            datetime={moment(comment.createdAt).fromNow()}
        />
    );
};

export default TaskCommentItem;
