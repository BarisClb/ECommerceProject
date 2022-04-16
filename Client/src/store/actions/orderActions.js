import { orderTypes } from "../types/orderTypes";
import { commonTypes } from "../types";

// // ORDER VM

// const orderCreate = {
// 	Description: "", // OPTINAL
// 	Address: "",
// 	UserId: 0,
// 	ProductId: 0,
// };

// const orderUpdate = {
// 	OrderId: 0,
// 	Description: "", // OPTINAL
// 	Address: "", // OPTINAL
// 	OrderStatus: 0, // OPTINAL
// };

// GET ORDERS

const getOrders = (orderId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Orders/";
		if (orderId) {
			url += `${orderId}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			if (orderId) {
				dispatch({ type: orderTypes.GetSingleOrder, payload: data });
			} else {
				dispatch({ type: orderTypes.GetOrders, payload: data });
			}
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD ORDER

const addOrder = (newOrder) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Orders";

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newOrder,
				}),
			});
			dispatch({ type: orderTypes.AddOrder });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE ORDER

const updateOrder = (orderId, updatedOrder) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Orders";

		try {
			let response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orderId,
					...updatedOrder,
				}),
			});
			await response.json();
			dispatch({ type: orderTypes.UpdateOrder });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE ORDER

const deleteOrder = (orderID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Orders/${orderID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
			dispatch({ type: orderTypes.DeleteOrder });
		} catch (error) {
			console.log(error);
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
