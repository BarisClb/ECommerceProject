import { categoryTypes } from "../types/categoryTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // CATEGORY VM

// const categoryCreate = {
// 	name: "",
// 	description: "",
// };

// const categoryUpdate = {
// 	id: 0,
// 	name: "", // OPTINAL
// 	description: "", // OPTINAL
// };

// GET CATEGORIES

const getCategories = (categoryId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Categories", categoryId);
		console.log(data);

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

const createCategory = (newCategory, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper(
			"Categories",
			newCategory
		);
		console.log(response);

		dispatch({ type: categoryTypes.CreateCategory });

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
		console.log(response);

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
		console.log(response);

		await dispatch({ type: categoryTypes.DeleteCategory });

		if (successCallback) {
			dispatch(successCallback);
		}

		await dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const categoryActions = {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
};
