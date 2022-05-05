import { orderTypes } from "../types/orderTypes";

export default function orderReducer(state = { orders: [], singleOrder: {} }, action) {
	switch (action.type) {
		case orderTypes.GetOrders:
			return { ...state, orders: action.payload };

		case orderTypes.GetSingleOrder:
			return { ...state, singleOrder: action.payload };

		case orderTypes.CreateOrder:
			return state;

		case orderTypes.UpdateOrder:
			return state;

		case orderTypes.DeleteOrder:
			return state;

		default:
			return state;
	}
}
