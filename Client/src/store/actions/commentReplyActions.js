import { commentReplyTypes } from "../types/commentReplyTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // COMMENTREPLY VM

// const commentReplyCreate = {
// 	Text: "",
// 	CommentId: 0,
// 	ProductId: 0,
// 	SellerId: 0,
// };

// const commentReplyUpdate = {
// 	CommentReplyId: 0,
// 	Text: "", // OPTINAL
// };

// GET COMMENTREPLIES

const getCommentReplies = (commentReplyId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper(
			"CommentReplies",
			commentReplyId
		);

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

const addCommentReply = (newCommentReply, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper(
			"CommentReplies",
			newCommentReply
		);

		dispatch({ type: commentReplyTypes.AddCommentReply });

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

		let response = actionHelpers.updateHelper(
			"CommentReplies",
			commentReplyId,
			updatedCommentReply
		);

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

		dispatch({ type: commentReplyTypes.DeleteCommentReply });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const commentReplyActions = {
	getCommentReplies,
	addCommentReply,
	updateCommentReply,
	deleteCommentReply,
};
