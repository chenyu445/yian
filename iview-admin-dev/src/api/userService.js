import fetch from './fetch';

const userService = {};

/*

 * }
 * case list
 */
userService.userslist = (params) => {
    return fetch({
        url: '/users',
        method: 'get',
        params: params
    });
};

//  create  new user
userService.createcase = (params) => {
    return fetch({
        url: '/case',
        method: 'post',
        data: params
    });
};

// getUserById
userService.getCaseById = (params) => {
    return fetch({
        url: `/users/${params.userId}`,
        method: 'get'
    });
};

// Update case by id
userService.updateCaseById = (params) => {
    return fetch({
        url: `/users/${params.userId}`,
        method: 'patch',
        data: params
    });
};

export default userService;
