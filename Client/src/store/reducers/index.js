import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import commonReducer from "./commonReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		common: commonReducer,
		category: categoryReducer,
		product: productReducer,
		cart: cartReducer,
	});

export default createRootReducer;
