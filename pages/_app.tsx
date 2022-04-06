import '../styles/globals.less'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux"
import {createStore}  from '../dva';
import Layouts from '../components/layouts'

function MyApp({Component, pageProps}: AppProps) {
    // getInitialProps({ Component, ctx }) {
    //     const { req, res, pathname, query, store } = ctx
    //
    //     let pageError, pageProps
    //     try {
    //         pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    //     } catch (error) {
    //         if (error instanceof JWPApiResponse) {
    //             pageError = { status: error.status, title: error.message }
    //         } else {
    //             throw error
    //         }
    //     }
    //
    //     return { pathname, query, store, pageError, pageProps }
    // }
    return  <Provider store={createStore({})}>
        <Layouts>
        <Component {...pageProps} />
        </Layouts>
    </Provider>
}

export default MyApp
