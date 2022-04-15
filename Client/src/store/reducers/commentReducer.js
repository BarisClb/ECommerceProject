import { commentTypes } from "../types/commentTypes";

export default function commentReducer(state = { comments: [] }, action) {
	switch (action.type) {
		case commentTypes:
			return { ...state, comments: action.payload };

		default:
			return state;
	}
}
