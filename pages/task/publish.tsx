import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {ConnectState} from "../../models/connect";
import {UsersType} from "../../type/type";
import Loading from "../../components/Loading";

interface IProps {
    userInfo: UsersType,
}
const Publish = ({userInfo}:IProps) => {
    const router = useRouter();
    useEffect(() => {
        if(!Object.keys(userInfo).length){
            router.push(`/account/login?redirect=${router.asPath}`)
        }
    }, [])
    return (
        <div>
            {
               Object.keys(userInfo).length ? (<h1>添加任务 同编辑</h1>) : <Loading/>
            }
        </div>
    );
};

function mapStateToProps(state:ConnectState):any{
    return {
        userInfo: state.global.userInfo
    }
}
export default connect(mapStateToProps)(Publish);
