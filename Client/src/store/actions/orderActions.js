import { orderTypes } from "../types/orderTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // ORDER VM

// const orderCreate = {
// 	description: "", // OPTINAL
// 	address: "",
// 	userId: 0,
// 	productId: 0,
// };

// const orderUpdate = {
// 	id: 0,
// 	description: "", // OPTINAL
// 	address: "", // OPTINAL
// 	orderStatus: 0, // OPTINAL
// };

// GET ORDERS

const getOrders = (orderId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Orders", orderId);

		if (orderId) {
			dispatch({ type: orderTypes.GetSingleOrder, payload: data });
		} else {
			dispatch({ type: orderTypes.GetOrders, payload: data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD ORDER

const addOrder = (newOrder, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper("Orders", newOrder);

		dispatch({ type: orderTypes.AddOrder });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE ORDER

const updateOrder = (orderId, updatedOrder, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.updateHelper(
			"Orders",
			orderId,
			updatedOrder
		);

		dispatch({ type: orderTypes.UpdateOrder });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE ORDER

const deleteOrder = (orderId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper("Orders", orderId);

		dispatch({ type: orderTypes.DeleteOrder });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const orderActions = {
	getOrders,
	addOrder,
	updateOrder,
	deleteOrder,
};
