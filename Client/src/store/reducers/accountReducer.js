import { accountTypes } from "../types/accountTypes";

export default function accountReducer(state = { user: {}, seller: {} }, action) {
	switch (action.type) {
		case accountTypes.UserLogIn:
			return { ...state, user: action.payload };

		case accountTypes.SellerLogIn:
			return { ...state, seller: action.payload };

		case accountTypes.UserVerify:
			return { ...state, user: action.payload };

		case accountTypes.SellerVerify:
			return { ...state, seller: action.payload };

		case accountTypes.UserLogOut:
			return { ...state, user: action.payload };

		case accountTypes.SellerLogOut:
			return { ...state, seller: action.payload };

		default:
			return state;
	}
}
