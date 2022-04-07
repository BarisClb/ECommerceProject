import { categoryTypes } from "../types/categoryTypes";
import { commonTypes } from "../types";

// GET CATEGORIES

const getCategories = (categoryId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Categories/";
		if (categoryId) {
			url += `getCategoryById?categoryId=${categoryId}`;
		} else {
			url += `all`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			dispatch({ type: categoryTypes.GetCategories, payload: data });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD CATEGORY

const addCategory = (newCategory) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Categories/addCategory";

		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: newCategory.name,
					description: newCategory.description,
				}),
			});
			// console.log(response);
			dispatch({ type: categoryTypes.AddCategory });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE CATEGORY

const updateCategory = (categoryId, updatedCategory) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Categories/updateCategory";

		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: categoryId,
					name: updatedCategory.name,
					description: updatedCategory.description,
				}),
			});
			let data = await response.json();
			// console.log(data);
			dispatch({ type: categoryTypes.UpdateCategory });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE CATEGORY

const deleteCategory = (categoryID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Categories/deleteCategory?categoryId=${categoryID}`;
		try {
			let response = await fetch(url, {
				method: "POST",
			});
			// console.log(response);
			dispatch({ type: categoryTypes.DeleteCategory });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const categoryActions = {
	getCategories,
	addCategory,
	updateCategory,
	deleteCategory,
};
