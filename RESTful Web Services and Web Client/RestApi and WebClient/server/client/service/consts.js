/**
 // All the const values are define here
 **/

// system configs
const SESSION_KEY = 'saddwerfsdgfsrtfewr465623as5f65eswf1';

// ============================================= API =============================================

/**
 * Note *
 * +++++++++++++++++ If you want to communicate with Using the WSO2 ESB +++++++++++++++++
 *  ----- Please Comment Out <DIRECT API ENDPOINTS> Code block in below
 *  ----- Please UnComment <WSO2 ESB API ENDPOINTS> Code block in below
 *
 * +++++++++++++++++ If you want to communicate with the server directly +++++++++++++++++
 *  ----- Please Comment Out <WSO2 ESB API ENDPOINTS> Code block in below
 *  ----- Please UnComment <DIRECT API ENDPOINTS> Code block in below
 */

// -------------------------------------------- START <DIRECT API ENDPOINTS> ------------------------------------------
const BASE_URL = 'http://localhost:5000/api/';

const AUTH_END_POINT = `${BASE_URL}auth`;
const CREATE_USER_END_POINT = `${BASE_URL}user`;
const UPDATE_USER_END_POINT = `${BASE_URL}user`;
const RESET_PASSWORD_END_POINT = `${BASE_URL}user/reset-password`;

const GET_ALL_DELIVERY = `${BASE_URL}delivery/getAll`;
const ADD_DELIVERY = `${BASE_URL}delivery/create`;
const DELETE_DELIVERY = `${BASE_URL}delivery/deleteById/`;
const UPDATE_DELIVERY = `${BASE_URL}delivery/update`;
const GET_DELIVERY_BY_ID = `${BASE_URL}delivery/getById/`;

const GET_ALL_CATEGORIES = `${BASE_URL}category/getAll`;
const ADD_CATEGORY = `${BASE_URL}category/create`;
const GET_CATEGORY_BY_ID = `${BASE_URL}category/getById/`;
const DELETE_CATEGORY = `${BASE_URL}category/deleteById/`;
const UPDATE_CATEGORY = `${BASE_URL}category/update`;

const ADD_ITEM = `${BASE_URL}item/create`;
const GET_ALL_ITEMS = `${BASE_URL}item/getAll`;
const GET_ITEM_BY_ID = `${BASE_URL}item/getById/`;
const DELETE_ITEM = `${BASE_URL}item/deleteById/`;
const UPDATE_ITEM = `${BASE_URL}item/update`;

const GET_CART=`${BASE_URL}cart/getAll`;
const ADD_CART= `${BASE_URL}cart/create`;
const UPDATE_CART = `${BASE_URL}cart/update`;
const DELETE_CART = `${BASE_URL}cart/deleteById/`;
const GET_CART_BY_ID = `${BASE_URL}cart/getById/`;

const ADD_ORDER= `${BASE_URL}order/create`;
const GET_ORDER=`${BASE_URL}order/getAll`;

// -------------------------------------------- END <DIRECT API ENDPOINTS> --------------------------------------------


// -------------------------------------------- START <WSO2 ESB API ENDPOINTS> ----------------------------------------
// const BASE_URL = 'http://192.168.11.1:8280/';
//
// const AUTH_END_POINT = `${BASE_URL}auth/`;
// const CREATE_USER_END_POINT = `${BASE_URL}create-user/`;
// const UPDATE_USER_END_POINT = `${BASE_URL}user/`;
// const RESET_PASSWORD_END_POINT = `${BASE_URL}reset-passsowrd/`;
//
// const GET_ALL_DELIVERY = `${BASE_URL}get-all-delivery`;
// const ADD_DELIVERY = `${BASE_URL}create-delivery/`;
// const DELETE_DELIVERY = `${BASE_URL}delivery-remove/`;
// const UPDATE_DELIVERY = `${BASE_URL}delivery-update`;
// const GET_DELIVERY_BY_ID = `${BASE_URL}delivery/getById/`;
//
// const GET_ALL_CATEGORIES = `${BASE_URL}category-getall/`;
// const ADD_CATEGORY = `${BASE_URL}category-create/`;
// const GET_CATEGORY_BY_ID = `${BASE_URL}category-getbyid/`;
// const DELETE_CATEGORY = `${BASE_URL}category-delete/`;
// const UPDATE_CATEGORY = `${BASE_URL}category-update/`;
//
// const ADD_ITEM = `${BASE_URL}item-create/`;
// const GET_ALL_ITEMS = `${BASE_URL}item-get-all/`;
// const GET_ITEM_BY_ID = `${BASE_URL}item-get-by-id/`;
// const DELETE_ITEM = `${BASE_URL}item-delete/`;
// const UPDATE_ITEM = `${BASE_URL}item-update`;
//
// const GET_CART=`${BASE_URL}cart-getall/`;
// const ADD_CART= `${BASE_URL}cart-create/`;
// const UPDATE_CART = `${BASE_URL}cart-update/`;
// const DELETE_CART = `${BASE_URL}cart-delete/`;
// const GET_CART_BY_ID = `${BASE_URL}cart-getbyid`;
//
// const ADD_ORDER= `${BASE_URL}order-create`;
// const GET_ORDER=`${BASE_URL}order/getAll`;

// -------------------------------------------- END <WSO2 ESB API ENDPOINTS> ------------------------------------------

// -------------------------------------------- Payment End Point ----------------------------------------
const ADD_CARD_PAYMENT = 'http://localhost:5100/api/v1/payment/card';
const ADD_PHONE_PAYMENT = 'http://localhost:5100/api/v1/payment/phone';

