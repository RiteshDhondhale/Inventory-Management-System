export const HOST = import.meta.env.VITE_SERVER_URL;

export const INVT_ROUTES = "/api/items";
export const CREATE_ITEM_ROUTE = `${INVT_ROUTES}/new-item`
export const GET_ITEM_ROUTE = `${INVT_ROUTES}/get-all-items`
export const DELETE_ROUTE = `${INVT_ROUTES}/delete-item`
export const UPDATE_ROUTE = `${INVT_ROUTES}/update-item`

export const VENDOR_ROUTES = "/api/vendors";
export const CREATE_VENDOR_ROUTE = `${VENDOR_ROUTES}/new-vendor`
export const GET_VENDOR_ROUTE = `${VENDOR_ROUTES}/get-all-vendors`
export const DELETE_VENDOR_ROUTE = `${VENDOR_ROUTES}/delete-vendor`
export const UPDATE_VENDOR_ROUTE = `${VENDOR_ROUTES}/update-vendor`

export const CUSTOMER_ROUTES = "/api/customers";
export const CREATE_CUSTOMER_ROUTE = `${CUSTOMER_ROUTES}/new-customer`
export const GET_CUSTOMER_ROUTE = `${CUSTOMER_ROUTES}/get-all-customers`
export const DELETE_CUSTOMER_ROUTE =`${CUSTOMER_ROUTES}/delete-customer`
export const UPDATE_CUSTOMER_ROUTE = `${CUSTOMER_ROUTES}/update-customer`

export const SALE_ROUTES = "/api/sales";
export const CREATE_SALE_ROUTE = `${SALE_ROUTES}/new-sale`
export const GET_SALE_ROUTE = `${SALE_ROUTES}/get-all-sales`