import fetch from './fetch';

const caseService = {};

/*

 * }
 * case list
 */
caseService.caselist = (params) => {
    return fetch({
        url: '/cases',
        method: 'get',
        params:params
    });
};

//  createCase
caseService.createcase = (params) => {
    return fetch({
        url: '/cases',
        method: 'post',
        data: params
    });
};

// getCaseById
caseService.getCaseById = (caseId) => {
    return fetch({
        url: `/cases/${caseId}`,
        method: 'get'
    });
};

// Update case by id
caseService.updateCaseById = (caseId,params) => {
    return fetch({
        url: `/cases/${caseId}`,
        method: 'patch',
        data: params
    });
};

// Get updates of case by id
caseService.getUpdateCaseById = (caseId,params) => {
    return fetch({
        url: `/cases/${caseId}/updates`,
        method: 'get',
        // param: params
    });
};
// post updates of case by id
caseService.postUpdateCaseById = (caseId,params) => {
    return fetch({
        url: `/cases/${caseId}/updates`,
        method: 'post',
        data: params
    });
};
export default caseService;
