import { likeTypes } from "../types/likeTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // LIKE VM

// const likeCreate = {
// 	userId: 0,
// 	commentId: 0,
//		productId: 0,
// };

// GET LIKES
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'
// But still can be used for getSingleUser

const getLikes = (likeId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getHelper("Likes", likeId);
		console.log(response);

		if (likeId) {
			dispatch({ type: likeTypes.GetSingleLike, payload: response.data });
		} else {
			dispatch({ type: likeTypes.GetLikes, payload: response.data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET SORTED LIKES

const getSortedLikes = (listSorting, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getSortedHelper("Likes", listSorting);
		console.log(response);

		dispatch({ type: likeTypes.GetLikes, payload: response.data });
		if (response.sortInfo !== undefined && response.sortInfo !== null) {
			dispatch({ type: commonTypes.SortInfo, payload: response.sortInfo });
		} else {
			dispatch({ type: commonTypes.SortInfo, payload: {} });
		}

		dispatch({ type: commonTypes.AsyncEnd });

		if (successCallback) {
			dispatch(successCallback);
		}
	};
};

// ADD LIKE

const createLike = (newLike, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Likes", newLike);
		console.log(response);

		dispatch({ type: likeTypes.CreateLike });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE LIKE

const deleteLike = (likeId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper("Likes", likeId);
		console.log(response);

		dispatch({ type: likeTypes.DeleteLike });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const likeActions = {
	getLikes,
	getSortedLikes,
	createLike,
	deleteLike,
};
