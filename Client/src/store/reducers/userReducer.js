import { userTypes } from "../types/userTypes";

export default function userReducer(state = { users: [] }, action) {
	switch (action.type) {
		case userTypes:
			return { ...state, users: action.payload };

		default:
			return state;
	}
}
