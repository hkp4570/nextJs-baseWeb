const url = require('url')
import Router from "next/router"
import type {ParsedUrlQuery} from 'querystring'

export type BaseRouter = {
    route?: string;
    pathname?: string;
    query?: ParsedUrlQuery;
    asPath?: string;
    basePath?: string;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
    isLocaleDomain?: boolean;
}

export function loginUrl({pathname, query}: BaseRouter) {
    const from = url.format({
        pathname: pathname || Router.pathname,
        query: query || Router.query,
    })
    return url.format({
        pathname: '/login',
        query: {
            from
        }
    })
}

export function needLogin({pathname, query}: BaseRouter) {
    Router.replace(loginUrl({pathname, query}));
}

export function isBrowser() {
    return typeof window !== 'undefined';
}

export function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time * 1000)
    })
}
