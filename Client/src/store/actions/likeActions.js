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

const getLikes = (likeId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Likes", likeId);

		if (likeId) {
			dispatch({ type: likeTypes.GetSingleLike, payload: data });
		} else {
			dispatch({ type: likeTypes.GetLikes, payload: data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD LIKE

const createLike = (newLike, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Likes", newLike);

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

		dispatch({ type: likeTypes.DeleteLike });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const likeActions = {
	getLikes,
	createLike,
	deleteLike,
};
