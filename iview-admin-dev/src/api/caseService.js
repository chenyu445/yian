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
        params: params
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
caseService.updateCaseById = (caseId, params) => {
    return fetch({
        url: `/cases/${caseId}`,
        method: 'patch',
        data: params
    });
};

// delete case by id
caseService.deleteCaseById = (caseId) => {
    return fetch({
        url: `/cases/${caseId}`,
        method: 'delete'
    });
};

// Get updates of case by id
caseService.getUpdateCaseById = (caseId, params) => {
    return fetch({
        url: `/cases/${caseId}/updates`,
        method: 'get',
        param: params
    });
};
// post updates of case by id
caseService.postUpdateCaseById = (caseId, params) => {
    return fetch({
        url: `/cases/${caseId}/updates`,
        method: 'post',
        data: params
    });
};
// patch case updates  by updatesid
caseService.patchCaseUpdateByUpdateId = (updataId, params) => {
    return fetch({
        url: `/cases/updates/${updataId}`,
        method: 'patch',
        data: params
    });
};
// delete case updates  by updatesid
caseService.deleteCaseUpdateByUpdateId = (updataId, params) => {
    return fetch({
        url: `/cases/updates/${updataId}`,
        method: 'delete',
        data: params
    });
};
// get case updates  by updatesid
caseService.getCaseUpdateByUpdateId = (updataId, params) => {
    return fetch({
        url: `/cases/updates/${updataId}`,
        method: 'get',
        params: params
    });
};
export default caseService;
