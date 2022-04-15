import { orderTypes } from "../types/orderTypes";

export default function orderReducer(state = { orders: [] }, action) {
	switch (action.type) {
		case orderTypes:
			return { ...state, orders: action.payload };

		default:
			return state;
	}
}
