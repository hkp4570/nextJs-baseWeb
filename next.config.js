/** @type {import('next').NextConfig} */
const withLess = require("next-with-less")
const withPlugins = require("next-compose-plugins");

const plugins = [
    withLess({
        lessLoaderOptions: {
            lessOptions: {
                modifyVars: {
                    "primary-color": "#1890ff",
                    "border-radius-base": "8px",
                },
            },
        },
    }),
]

module.exports = withPlugins(plugins,{
    reactStrictMode: true,
})
