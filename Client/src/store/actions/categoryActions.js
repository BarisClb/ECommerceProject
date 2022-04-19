import { categoryTypes } from "../types/categoryTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // CATEGORY VM

// const categoryCreate = {
// 	Name: "",
// 	Description: "",
// };

// const categoryUpdate = {
// 	CategoryId: 0,
// 	Name: "", // OPTINAL
// 	Description: "", // OPTINAL
// };

// GET CATEGORIES

const getCategories = (categoryId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Categories", categoryId);

		if (categoryId) {
			dispatch({ type: categoryTypes.GetSingleCategory, payload: data });
		} else {
			dispatch({ type: categoryTypes.GetCategories, payload: data });
		}

		dispatch({ type: commonTypes.AsyncEnd });

		if (successCallback) {
			dispatch(successCallback);
		}
	};
};

// ADD CATEGORY

const addCategory = (newCategory, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper("Categories", newCategory);

		dispatch({ type: categoryTypes.AddCategory });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE CATEGORY

const updateCategory = (categoryId, updatedCategory, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.updateHelper(
			"Categories",
			categoryId,
			updatedCategory
		);

		dispatch({ type: categoryTypes.UpdateCategory });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE CATEGORY

const deleteCategory = (categoryId, successCallback) => {
	return async (dispatch) => {
		await dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper("Categories", categoryId);

		await dispatch({ type: categoryTypes.DeleteCategory });

		if (successCallback) {
			dispatch(successCallback);
		}

		await dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const categoryActions = {
	getCategories,
	addCategory,
	updateCategory,
	deleteCategory,
};
