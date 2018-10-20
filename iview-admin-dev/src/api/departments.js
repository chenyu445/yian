import fetch from './fetch';

const deparmentService = {};

/*
Get department list
 * }
 */
deparmentService.departments = (params) => {
    return fetch({
        url: '/departments',
        method: 'get',
        params: params
    });
};

// create departments
deparmentService.createDepartments = (params) => {
    return fetch({
        url: '/departments',
        method: 'post',
        data: params
    });
};

// get departments by id
deparmentService.getDepartmentById = (id) => {
    return fetch({
        url: `/departments/${id}`,
        method: 'get'
    });
};
// patch departments by id
deparmentService.patchDepartmentById = (params) => {
    return fetch({
        url: `/departments/${params.id}`,
        method: 'patch',
        data: params
    });
};
// patch departments by id
deparmentService.deleteDeparmentById = (DeparmentId) => {
    return fetch({
        url: `/departments/${DeparmentId}`,
        method: 'delete'
    });
};
// get departments case by id
deparmentService.patchDepartmentCaseById = (params) => {
    return fetch({
        url: `/departments/${params.departmentId}/cases`,
        method: 'get',
        param: params
    });
};
// get departments users by id
deparmentService.getDepartmentUsersById = (params) => {
    return fetch({
        url: `/departments/${params.departmentId}/users`,
        method: 'get',
        param: params
    });
};
// get departments case by id
deparmentService.getDepartmentCasesById = (departmentId,params) => {
    return fetch({
        url: `/departments/${departmentId}/cases`,
        method: 'get',
        param: params
    });
};



export default deparmentService;
