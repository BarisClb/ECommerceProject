import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import commentReducer from "./commentReducer";
import commentReplyReducer from "./commentReplyReducer";
import commonReducer from "./commonReducer";
import likeReducer from "./likeReducer";
import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import sellerReducer from "./sellerReducer";
import userReducer from "./userReducer";
import accountReducer from "./accountReducer";

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		account: accountReducer,
		cart: cartReducer,
		category: categoryReducer,
		comment: commentReducer,
		commentReply: commentReplyReducer,
		common: commonReducer,
		like: likeReducer,
		order: orderReducer,
		product: productReducer,
		seller: sellerReducer,
		user: userReducer,
	});

export default createRootReducer;
