import { sellerTypes } from "../types/sellerTypes";

export default function sellerReducer(
	state = { sellers: [], singleSeller: {} },
	action
) {
	switch (action.type) {
		case sellerTypes.GetSellers:
			return { ...state, sellers: action.payload };

		case sellerTypes.GetSingleSeller:
			return { ...state, singleSeller: action.payload };

		case sellerTypes.CreateSeller:
			return state;

		case sellerTypes.UpdateSeller:
			return state;

		case sellerTypes.DeleteSeller:
			return state;

		default:
			return state;
	}
}
