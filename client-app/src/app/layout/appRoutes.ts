export const CREATE_BONSAI_ROUTE = '/create-bonsai';
export const LIST_BONSAI_ROUTE = '/bonsai';
export const DETAIL_BONSAI_ROUTE = '/bonsai/:id';
export const detailBonsaiRoute = (id: String) => `/bonsai/${id}`;
export const MANAGE_BONSAI_ROUTE = '/bonsai/:id/manage';
export const manageBonsaiRoute = (id: String) => `/bonsai/${id}/manage`;

export const CREATE_JOB_ROUTE = '/bonsai/:bonsaiId/create-job';
export const createJobRoute = (bonsaiId: String) => `/bonsai/${bonsaiId}/create-job`;

export const LOG_IN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';

export const NOT_FOUND_ROUTE = '/notfound';
