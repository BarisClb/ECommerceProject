import { likeTypes } from "../types/likeTypes";

export default function likeReducer(state = { likes: [], singleLike: {} }, action) {
	switch (action.type) {
		case likeTypes.GetLikes:
			return { ...state, likes: action.payload };

		case likeTypes.GetSingleLike:
			return { ...state, singleLike: action.payload };

		case likeTypes.CreateLike:
			return state;

		case likeTypes.UpdateLike:
			return state;

		case likeTypes.DeleteLike:
			return state;

		default:
			return state;
	}
}
