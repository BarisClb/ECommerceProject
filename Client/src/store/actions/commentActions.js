import { commentTypes } from "../types/commentTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // COMMENT VM

// const commentCreate = {
// 	title: "",
// 	text: "",
// 	rating: 0,
// 	userId: 0,
// 	productId: 0,
// };

// const commentUpdate = {
// 	id: 0,
// 	title: "", // OPTINAL
// 	text: "", // OPTINAL
// 	rating: 0, // OPTINAL
// };

// GET COMMENTS

const getComments = (commentId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Comments", commentId);

		if (commentId) {
			dispatch({ type: commentTypes.GetSingleComment, payload: data });
		} else {
			dispatch({ type: commentTypes.GetComments, payload: data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD COMMENT

const createComment = (newComment, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Comments", newComment);

		dispatch({ type: commentTypes.CreateComment });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE COMMENT

const updateComment = (commentId, updatedComment, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.updateHelper(
			"Comments",
			commentId,
			updatedComment
		);

		dispatch({ type: commentTypes.UpdateComment });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE COMMENT

const deleteComment = (commentId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper("Comments", commentId);

		dispatch({ type: commentTypes.DeleteComment });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const commentActions = {
	getComments,
	createComment,
	updateComment,
	deleteComment,
};
