import { INVENTORY } from "./actions.contants";

const BASE_URL =
  "https://b32b4c83-9a63-4c19-9367-20404a670c33-00-1bfon7h1bi07g.sisko.replit.dev";

export const addItemInInventory = (item) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    dispatch({ type: INVENTORY.ADD_ITEM_SUCCESS, payload: data.item });
  } catch (error) {
    console.error("error ~ addItemInInventory", error);
    dispatch({ type: INVENTORY.ADD_ITEM_FAILURE });
  }
};

export const getInventoryItems = () => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY.GET_ITEMS_LOADING });
    const response = await fetch(`${BASE_URL}/inventory`, { method: "GET" });
    const data = await response.json();
    dispatch({ type: INVENTORY.GET_ITEMS_SUCCESS, payload: data.items });
  } catch (error) {
    dispatch({ type: INVENTORY.GET_ITEMS_FAILURE });
  }
};

export const updateInventoryItem = (itemId, item) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    dispatch({ type: INVENTORY.UPDATE_ITEM_SUCCESS, payload: data.item });
  } catch (error) {
    dispatch({ type: INVENTORY.UPDATE_ITEM_FAILURE });
  }
};

export const deleteInventoryItem = (itemId) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/${itemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    dispatch({ type: INVENTORY.DELETE_ITEM_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({ type: INVENTORY.DELETE_ITEM_FAILURE });
  }
};

export const filterItemsByCategory = (category) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/category/${category}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch({
      type: INVENTORY.FILTER_BY_CATEGORY_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({ type: INVENTORY.FILTER_BY_CATEGORY_FAILURE });
  }
};

export const addTransction = (soldItem) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(soldItem),
    });
    const data = await response.json();
    dispatch({ type: INVENTORY.ADD_TRANSACTION_SUCCESS, payload: data.item });
  } catch (error) {
    console.error("error ~ addItemInInventory", error);
    dispatch({ type: INVENTORY.ADD_TRANSACTION_FAILURE });
  }
};

export const getAllTransations = () => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY.GET_TRANSACTIONS_LOADING });
    const response = await fetch(`${BASE_URL}/sales`, { method: "GET" });
    const data = await response.json();
    dispatch({
      type: INVENTORY.GET_TRANSACTIONS_SUCCESS,
      payload: data.transactions,
    });
  } catch (error) {
    dispatch({ type: INVENTORY.GET_TRANSACTIONS_FAILURE });
  }
};

export const filterTransactionByDate = (dates) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/sales/date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dates),
    });
    const data = await response.json();
    dispatch({
      type: INVENTORY.FILTER_TRANSACTION_SUCCESS,
      payload: data.transactions,
    });
  } catch (error) {
    dispatch({ type: INVENTORY.FILTER_TRANSACTION_FAILURE });
  }
};

export const getSalesReport = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/sales/report`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch({
      type: INVENTORY.GET_SALES_REPORT_SUCCESS,
      payload: data.report,
    });
  } catch (error) {
    dispatch({ type: INVENTORY.GET_SALES_REPORT_FAILURE });
  }
};
