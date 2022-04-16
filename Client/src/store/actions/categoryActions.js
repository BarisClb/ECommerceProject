import { categoryTypes } from "../types/categoryTypes";
import { commonTypes } from "../types";

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

const getCategories = (categoryId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Categories/";
		if (categoryId) {
			url += `${categoryId}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			if (categoryId) {
				dispatch({ type: categoryTypes.GetSingleCategory, payload: data });
			} else {
				dispatch({ type: categoryTypes.GetCategories, payload: data });
			}
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

		let url = "https://localhost:7000/api/Categories";

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newCategory,
				}),
			});
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

		let url = "https://localhost:7000/api/Categories";

		try {
			await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					categoryId,
					...updatedCategory,
				}),
			});
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

		let url = `https://localhost:7000/api/Categories/${categoryID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
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
