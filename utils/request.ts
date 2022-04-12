import qs from 'qs'
import Router from 'next/router'
import {useCallback} from "react";

interface Config extends RequestInit {
    data?: object,
}

const baseUrl = 'http://localhost:4000';
export const http = async<H> (url: string, config: Config = {}) => {
    const {data, headers, ...customConfig} = config;
    // ? 自定义请求头跨域问题
    const _config = {
        method: 'GET',
        // headers: {
        //     'Content-Type': data ? 'application/json' : '',
        // },
        ...customConfig,
    }
    if (_config.method.toUpperCase() === 'GET') {
        url += `?${qs.stringify(data)}`;
    } else {
        _config.body = JSON.stringify(data || {});
    }

    return fetch(baseUrl + url, _config).then(async (response) => {
        if (response.status === 401) {
            await Router.replace('/login');
            return Promise.reject(await response.json());
        } else {
            const data:H = await response.json();
            if (response.ok) {
                return data;
            }
            return Promise.reject(await response.json());
        }
    })
}

// ?
export const useHttp = () => {
    return useCallback((...[url, config]: Parameters<typeof http>) => {
        return http(url, {...config})
    }, [])
}
