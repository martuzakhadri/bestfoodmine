const BASE_URL = 'http://localhost:5000';

export const FOODS_URL = BASE_URL +'/api/foods';
export const FOODS_TAGS_URL = FOODS_URL +'/tags';
export const FOODS_SEARCH_URL = FOODS_URL +'/search/';
export const FOODS_TAG_URL = FOODS_URL +'/tag/';
export const FOOD_ID_URL = FOODS_URL +'/';

export const USER_URL = BASE_URL +'/api/users';
export const LOGIN_URL =  USER_URL + '/login';
export const REGISTER_URL =  USER_URL + '/register';

export const ORDERS_URL = BASE_URL+'/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL +'/create';