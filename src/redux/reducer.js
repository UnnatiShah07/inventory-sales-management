import { INVENTORY } from "./actions.contants";

const initialState = {
  loading: false,
  inventoryItems: [],
  transactions: [],
  salesReport: [],
  error: "",
};

export const managementReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVENTORY.GET_ITEMS_SUCCESS:
      return { ...state, inventoryItems: action.payload };
    case INVENTORY.GET_ITEMS_FAILURE:
      return { ...state, error: "Failed to get inventory items." };

    case INVENTORY.ADD_ITEM_SUCCESS:
      return {
        ...state,
        inventoryItems: [...state.inventoryItems, action.payload],
      };
    case INVENTORY.ADD_ITEM_FAILURE:
      return { ...state, error: "Failed to add item in inventory." };

    case INVENTORY.UPDATE_ITEM_SUCCESS:
      const updatedItem = action.payload;
      return {
        ...state,
        inventoryItems: [...state.inventoryItems].map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        ),
      };
    case INVENTORY.UPDATE_ITEM_FAILURE:
      return { ...state, error: "Failed to update item in inventory." };

    case INVENTORY.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        inventoryItems: [...state.inventoryItems].filter(
          (item) => item._id !== action.payload
        ),
      };
    case INVENTORY.DELETE_ITEM_FAILURE:
      return { ...state, error: "Failed to delete item in inventory." };

    case INVENTORY.FILTER_BY_CATEGORY_SUCCESS:
      return { ...state, inventoryItems: action.payload };
    case INVENTORY.DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: "Failed to filter items by category in inventory.",
      };

    case INVENTORY.ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case INVENTORY.ADD_TRANSACTION_FAILURE:
      return { ...state, error: "Failed to add transaction." };

    case INVENTORY.GET_TRANSACTIONS_LOADING:
      return { ...state, loading: true };
    case INVENTORY.GET_TRANSACTIONS_SUCCESS:
      return { ...state, transactions: action.payload, loading: false };
    case INVENTORY.GET_TRANSACTIONS_FAILURE:
      return { ...state, error: "Failed to get transactions.", loading: false };

    case INVENTORY.FILTER_TRANSACTION_SUCCESS:
      return { ...state, transactions: action.payload };
    case INVENTORY.FILTER_TRANSACTION_FAILURE:
      return {
        ...state,
        error: "Failed to filter transactions by dates.",
      };

    case INVENTORY.GET_SALES_REPORT_SUCCESS:
      return { ...state, salesReport: action.payload };
    case INVENTORY.GET_SALES_REPORT_FAILURE:
      return {
        ...state,
        error: "Failed to generate sales report.",
      };

    default:
      return state;
  }
};
