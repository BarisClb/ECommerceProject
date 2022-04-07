import { categoryTypes } from "../types/categoryTypes";

export default function categoryReducer(state = { categories: [] }, action) {
	switch (action.type) {
		case categoryTypes.GetCategories:
			return { ...state, categories: action.payload };

		case categoryTypes.AddCategory:
			return state;

		case categoryTypes.UpdateCategory:
			return state;

		case categoryTypes.DeleteCategory:
			return state;

		default:
			return state;
	}
}
