import { commentReplyTypes } from "../types/commentReplyTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // COMMENTREPLY VM

// const commentReplyCreate = {
// 	text: "",
// 	commentId: 0,
// 	productId: 0,
// 	sellerId: 0,
// };

// const commentReplyUpdate = {
// 	id: 0,
// 	text: "", // OPTINAL
// };

// GET COMMENTREPLIES

const getCommentReplies = (commentReplyId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper(
			"CommentReplies",
			commentReplyId
		);
		console.log(data);

		if (commentReplyId) {
			dispatch({
				type: commentReplyTypes.GetSingleCommentReply,
				payload: data,
			});
		} else {
			dispatch({
				type: commentReplyTypes.GetCommentReplies,
				payload: data,
			});
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD COMMENTREPLY

const createCommentReply = (newCommentReply, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper(
			"CommentReplies",
			newCommentReply
		);
		console.log(response);

		dispatch({ type: commentReplyTypes.CreateCommentReply });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE COMMENTREPLY

const updateCommentReply = (
	commentReplyId,
	updatedCommentReply,
	successCallback
) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.updateHelper(
			"CommentReplies",
			commentReplyId,
			updatedCommentReply
		);
		console.log(response);

		dispatch({ type: commentReplyTypes.UpdateCommentReply });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE COMMENTREPLIES

const deleteCommentReply = (commentReplyId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper(
			"CommentReplies",
			commentReplyId
		);
		console.log(response);

		dispatch({ type: commentReplyTypes.DeleteCommentReply });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const commentReplyActions = {
	getCommentReplies,
	createCommentReply,
	updateCommentReply,
	deleteCommentReply,
};
