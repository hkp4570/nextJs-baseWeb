import '../styles/globals.less';
import type {AppProps} from 'next/app';
import {Provider} from "react-redux";
import {getOrCreateStore} from '../dva';
import Layouts from '../components/layouts';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function MyApp({Component, pageProps}: AppProps) {
    const {_initialState, ...params} = pageProps;
    return <ConfigProvider locale={zhCN}>
        <Provider store={getOrCreateStore(_initialState)}>
            <Layouts>
                <Component {...params} />
            </Layouts>
        </Provider>
    </ConfigProvider>
}

export default MyApp
