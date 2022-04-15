import { likeTypes } from "../types/likeTypes";

export default function likeReducer(state = { likes: [] }, action) {
	switch (action.type) {
		case likeTypes:
			return { ...state, likes: action.payload };

		default:
			return state;
	}
}
