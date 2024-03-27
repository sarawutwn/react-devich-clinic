let hostname = import.meta.env.VITE_ENDPOINT_API;

// USER ENDPOINT
export const SIGN_IN = `${hostname}/api/auth/local/sign-in`;
export const UPDATE_MY_PROFILE = `${hostname}/api/auth/update-my-profile`;
export const SIGN_IN_ADMIN = `${hostname}/api/users/sign-in-admin`;
export const GET_PROFILE = `${hostname}/api/auth/my-profile`;
export const RESET_PASSWORD = `${hostname}/api/users/reset-password`;
export const GET_USER_BY_STORE_ID = `${hostname}/api/auth/user/get-list`;
export const ADD_PREFIX_USERS = `${hostname}/api/auth/prefix/sign-up`;
export const UPDATE_ROLE_BY_USER_ID = `${hostname}/api/users/update-roles`;
export const UPDATE_PROFILE_BY_ID = `${hostname}/api/users/update-profile/`;
export const UPDATE_USER_STATUS = `${hostname}/api/users/update-status`;
export const GET_ALL_USERS = `${hostname}/api/auth/user/get-all`;

// REPORT
export const HOME_REPORT = `${hostname}/api/report/home-transaction`;
export const SUPER_HOME_REPORT = `${hostname}/api/report/super/home-transaction`;

// ROLES ENDPOINT
export const GET_ROLES = `${hostname}/api/role/get-roles`;
export const GET_ALL_ROLES = `${hostname}/api/role/get-all`;
export const CREATE_ROLES = `${hostname}/api/role/create`;
export const UPDATE_ROLES = `${hostname}/api/role/update/`;
export const DELETE_ROLES = `${hostname}/api/role/delete/`;

// PERMISSION ENDPOINT
export const GET_ALL_PERMISSION = `${hostname}/api/permission/get-all`;
export const CREATE_PERMISSION = `${hostname}/api/permission/create`;
export const UPDATE_PERMISSION = `${hostname}/api/permission/update/`;
export const CREATE_COMPONENT = `${hostname}/api/permission/component/create/`;
export const GET_COMPONENT_BY_ID = `${hostname}/api/permission/component/get-by-permission/`;
export const DELETE_COMPONENT_BY_ID = `${hostname}/api/permission/component/delete-by-id/`;
export const GET_PERMISSION_WITH_COMPONENT = `${hostname}/api/permission/get-all/with-component`;
export const GET_COMPONENT_BY_ROLE_ID = `${hostname}/api/permission/get-component/by-role/`;
export const UPDATE_ROLES_GROUP = `${hostname}/api/permission/update-role-groups/`;

// PREFIX ENDPOINT
export const GET_ALL_PREFIX = `${hostname}/api/prefix/get-all`;
export const ADD_NEW_PREFIX = `${hostname}/api/prefix/add-new-prefix`;
export const SWITCH_PREFIX_STATUS = `${hostname}/api/prefix/switch-status/`;
export const UPDATE_PREFIX = `${hostname}/api/prefix/update/`;
export const PREFIX_DETAIL = `${hostname}/api/prefix/get-prefix-detail`;
export const SUPER_PREFIX_DETAIL = `${hostname}/api/prefix/super-get-prefix-detail/`;
export const GET_AI_DETAIL = `${hostname}/api/prefix/get-ai-detail`;
export const UPDATE_AI_DETAIL = `${hostname}/api/prefix/update-ai-detail`;

// STORE ENDPOINT
export const GET_POINT_SETTING = `${hostname}/api/store/point-setting`;
export const UPDATE_POINT_SETTING = `${hostname}/api/store/update-point-setting`;
export const GET_THEME_SETTING = `${hostname}/api/prefix/get-theme-setting`;
export const UPDATE_THEME_SETTING = `${hostname}/api/prefix/update-theme-setting`;
export const GET_DATA_STORE = `${hostname}/api/store/get-data`;
export const GET_ALL_STORE = `${hostname}/api/store/get-all/`;

// product
export const GET_PRODUCT_ALL = `${hostname}/api/product/get-all`;
export const GET_PRODUCT_BY_ID = `${hostname}/api/product/get-by-id/`;
export const CREATE_PRODUCT = `${hostname}/api/product/create`;
export const DELETE_PRODUCT = `${hostname}/api/product/delete/`;
export const UPDATE_PRODUCT = `${hostname}/api/product/update/`;

// TRANSACTION
export const GET_TRANSACTION = `${hostname}/api/transaction/get-transaction`;
export const GET_DETAIL = `${hostname}/api/transaction/detail/`;
export const PLAY_TRANSACTION = `${hostname}/api/transaction/play-transaction-again/`;
export const APPROVE_TRANSACTION = `${hostname}/api/transaction/approve-transaction/`;
export const CALCEL_TRANSACTION = `${hostname}/api/transaction/cancel-transaction/`;

// IMAGE
export const UPLOAD_IMG = `${hostname}/api/upload-files/image`;
