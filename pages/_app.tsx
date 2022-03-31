import '../styles/globals.less'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux"
import {createDvaStore} from '../dva'
import Layouts from '../components/layouts'

function MyApp({Component, pageProps}: AppProps) {
    return  <Provider store={createDvaStore({})}>
        <Layouts>
        <Component {...pageProps} />
        </Layouts>
    </Provider>
}

export default MyApp
