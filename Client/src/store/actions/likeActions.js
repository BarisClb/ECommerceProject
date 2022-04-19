import { likeTypes } from "../types/likeTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // LIKE VM

// const likeCreate = {
// 	UserId: 0,
// 	CommentId: 0,
// };

// GET LIKES

const getlikes = (likeId, successCallback) => {
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

const addlike = (newLike, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper("Likes", newLike);

		dispatch({ type: likeTypes.AddLike });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE LIKE

const deletelike = (likeId, successCallback) => {
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
	getlikes,
	addlike,
	deletelike,
};
