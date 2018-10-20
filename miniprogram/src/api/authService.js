import fetch from './fetch';

const authService = {};

/*

 * }
 */
authService.auth = function (params) {
    return fetch({
        url: '/auth',
        method: 'get',
        params: params
    });
};
authService.login = function (params) {
    return fetch({
        url: '/auth/login',
        method: 'post',
        data: params
    });
};
authService.logout = function (params) {
    return fetch({
        url: '/auth/logout',
        method: 'post',
        data: params
    });
};

export default authService;
