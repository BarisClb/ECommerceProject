import { orderTypes } from "../types/orderTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // ORDER VM

// const orderCreate = {
// 	note: "", // OPTINAL
// 	address: "",
//		price: 0,
//		quantity: 0,
//		discount: 0,
//		total: 0,	-> INACCESSIBLE, calculated through -> (price * quantity) / 100 * (100 - discount)
// 	userId: 0,
// 	productId: 0,
// };

// const orderUpdate = {
// 	id: 0,
// 	note: "", // OPTINAL
// 	address: "", // OPTINAL
//		price: 0, // OPTINAL
//		quantity: 0, // OPTINAL
//		discount: 0, // OPTINAL
//		total: 0,	-> INACCESSIBLE, calculated through -> (price * quantity) / 100 * (100 - discount)
// 	orderStatus: 0, // OPTINAL
// };

// GET ORDERS
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'
// But still can be used for getSingleUser

const getOrders = (orderId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getHelper("Orders", orderId);
		console.log(response);

		if (orderId) {
			dispatch({ type: orderTypes.GetSingleOrder, payload: response.data });
		} else {
			dispatch({ type: orderTypes.GetOrders, payload: response.data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET SORTED ORDERS

const getSortedOrders = (listSorting, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getSortedHelper("Orders", listSorting);
		console.log(response);

		dispatch({ type: orderTypes.GetOrders, payload: response.data });
		if (response.sortInfo !== undefined && response.sortInfo !== null) {
			dispatch({ type: commonTypes.SortInfo, payload: response.sortInfo });
		} else {
			dispatch({ type: commonTypes.SortInfo, payload: {} });
		}

		dispatch({ type: commonTypes.AsyncEnd });

		if (successCallback) {
			dispatch(successCallback);
		}
	};
};

// GET SORTED ORDERS BY ENTITY

const getSortedOrdersByEntity = (
	singleEntityName,
	listSorting,
	singleEntityId,
	successCallback
) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getEntitiesByEntitySortedHelper(
			"Orders",
			singleEntityName,
			singleEntityId,
			listSorting
		);
		console.log(response);

		dispatch({ type: orderTypes.GetOrders, payload: response.data });
		if (response.sortInfo !== undefined && response.sortInfo !== null) {
			dispatch({ type: commonTypes.SortInfo, payload: response.sortInfo });
		} else {
			dispatch({ type: commonTypes.SortInfo, payload: {} });
		}

		dispatch({ type: commonTypes.AsyncEnd });

		if (successCallback) {
			dispatch(successCallback);
		}
	};
};

// ADD ORDER

const createOrder = (newOrder, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Orders", newOrder);
		console.log(response);

		dispatch({ type: orderTypes.CreateOrder });

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

		let response = await actionHelpers.updateHelper("Orders", orderId, updatedOrder);
		console.log(response);

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
		console.log(response);

		dispatch({ type: orderTypes.DeleteOrder });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const orderActions = {
	getOrders,
	getSortedOrders,
	getSortedOrdersByEntity,
	createOrder,
	updateOrder,
	deleteOrder,
};
