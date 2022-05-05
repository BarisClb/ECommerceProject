import { accountTypes } from "../types/accountTypes";

export default function accountReducer(state = { user: {}, seller: {} }, action) {
	switch (action.type) {
		case accountTypes.LogIn:
			return state;

		case accountTypes.LogOut:
			return state;

		default:
			return state;
	}
}
