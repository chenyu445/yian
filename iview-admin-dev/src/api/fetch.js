import axios from 'axios';
import { router } from '../router/index';
import store from '../store';
import { http } from './config';
import Vue from '../main';
import Cookies from 'js-cookie';
// console.log('http:', http);
// 创建axios实例
const service = axios.create({
    timeout: 100000, // 请求超时时间
    baseURL: http
});

// request拦截器
service.interceptors.request.use(config => {
    // var
    console.log('request', config);
    if (config.url != '/auth/login') {
        config.headers.Authorization = Cookies.get('token');
    }

    return config;
}, error => {
    // Do something with request error
    // console.error(error); // for debug
    Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 302) {
            Vue.$Message.warning({
                closable: true,
                duration: 3,
                render: h => {
                    return h('div', {
                        'style': {
                            'fontSize': '16px'
                        },
                        domProps: {
                            innerHTML: '当前登录过期，请重新登录'
                        }
                    });
                },
                onClose () {
                    store.commit('logout', this);
                    store.commit('clearOpenedSubmenu');
                    router.push({
                        name: 'login'
                    });
                }
            });
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        // console.error('fetch err:', error);// for debug
        return Promise.reject(error);
    }
);

export default service;
