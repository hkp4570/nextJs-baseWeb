/** @type {import('next').NextConfig} */
const withLess = require("next-with-less")
const withPlugins = require("next-compose-plugins");

const plugins = [
    withLess({
        lessLoaderOptions: {
            lessOptions: {
                modifyVars: {
                    "primary-color": "#d4380d",
                    "border-radius-base": "8px",
                },
            },
        },
    }),
]

module.exports = withPlugins(plugins,{
    reactStrictMode: true,
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
        baseUrl: 'http://localhost:3001/'
    },
    env:{
        name: 'jwpay',
        version: '1.0.0',
        primaryColor: '#d4380d',
        linkColor: '#610b00',
    }
})
