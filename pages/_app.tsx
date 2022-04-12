import '../styles/globals.less';
import type {AppProps} from 'next/app';
import {Provider} from "react-redux";
import {createStore} from '../dva';
import Layouts from '../components/layouts';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function MyApp({Component, pageProps}: AppProps) {
    return <ConfigProvider locale={zhCN}>
        <Provider store={createStore({})}>
            <Layouts>
                <Component {...pageProps} />
            </Layouts>
        </Provider>
    </ConfigProvider>
}

export default MyApp
