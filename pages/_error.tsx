import React from 'react'
import Head from 'next/Head'
import {useRouter} from 'next/router'
import {Button, Result} from "antd"
import {ResultStatusType} from 'antd/lib/result'

interface IProps {
    statusCode: ResultStatusType
}

function Error({statusCode}: IProps) {
    const router = useRouter();
    console.log()
    return (
        <div>
            <Head>
                <title key={'title'}>错误页 - {process.env.title}</title>
            </Head>

            <Result
                status={statusCode}
                title={statusCode}
                extra={<>
                    <Button key={'back'} type={'primary'} onClick={() => {router.back()}}>返回前页</Button>
                    <Button key={'index'} onClick={() => router.push('/')}>返回首页</Button>
                </>}
            />
        </div>
    )
}

Error.getInitialProps = ({res, err}: { res: any, err: any }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return {statusCode}
}

export default Error
