import { cartTypes } from "../types/cartTypes";

export default function cartReducer(state = { currentCart: [] }, action) {
	switch (action.type) {
		case cartTypes.AddOrIncreaseCart:
			return { ...state, currentCart: action.payload };

		case cartTypes.ReduceFromCart:
			return { ...state, currentCart: action.payload };

		case cartTypes.RemoveFromCart:
			return { ...state, currentCart: action.payload };

		case cartTypes.ClearCart:
			return { ...state, currentCart: action.payload };

		default:
			return state;
	}
}
