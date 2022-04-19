import { commentTypes } from "../types/commentTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // COMMENT VM

// const commentCreate = {
// 	Title: "",
// 	Text: "",
// 	Rating: 0,
// 	UserId: 0,
// 	ProductId: 0,
// };

// const commentUpdate = {
// 	CommentId: 0,
// 	Title: "", // OPTINAL
// 	Text: "", // OPTINAL
// 	Rating: 0, // OPTINAL
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

const addComment = (newComment, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper("Comments", newComment);

		dispatch({ type: commentTypes.AddComment });

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
	addComment,
	updateComment,
	deleteComment,
};
