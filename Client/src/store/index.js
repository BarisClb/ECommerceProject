import { applyMiddleware, createStore, compose } from "redux";
import createRootReducer from "./reducers";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const storeManager = {
	store: null,
	history: null,
	persistor: null,
	createStore(basePath) {
		this.history = createBrowserHistory({ basename: basePath });
		var persistedReducer = persistReducer(
			{ key: "root", storage },
			createRootReducer(this.history)
		);
		var composeEnhancer =
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

		this.store = createStore(
			persistedReducer,
			composeEnhancer(applyMiddleware(routerMiddleware(this.history), thunk))
		);

		this.persistor = persistStore(this.store);

		return this.store;
	},
};

export default storeManager;
