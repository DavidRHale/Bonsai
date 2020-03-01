export const CREATE_BONSAI_ROUTE = '/create-bonsai';

export const MANAGE_ROUTE = '/manage/:id';
export const manageRoute = (id: String) => `/manage/${id}`;

export const LIST_BONSAI_ROUTE = '/bonsai';

export const DETAIL_BONSAI_ROUTE = '/bonsai/:id';
export const detailBonsaiRoute = (id: String) => `/bonsai/${id}`;

export const LOG_IN_ROUTE = '/login';

export const REGISTER_ROUTE = '/register';

export const NOT_FOUND_ROUTE = '/notfound';
