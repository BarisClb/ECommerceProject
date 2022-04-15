import { sellerTypes } from "../types/sellerTypes";

export default function sellerReducer(state = { sellers: [] }, action) {
	switch (action.type) {
		case sellerTypes:
			return { ...state, sellers: action.payload };

		default:
			return state;
	}
}
