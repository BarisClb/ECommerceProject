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
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'
// But still can be used for getSingleUser

const getCommentReplies = (commentReplyId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getHelper("CommentReplies", commentReplyId);
		console.log(response);

		if (commentReplyId) {
			dispatch({
				type: commentReplyTypes.GetSingleCommentReply,
				payload: response.data,
			});
		} else {
			dispatch({
				type: commentReplyTypes.GetCommentReplies,
				payload: response.data,
			});
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET SORTED COMMENTREPLIES

const getSortedCommentReplies = (listSorting, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getSortedHelper("CommentReplies", listSorting);
		console.log(response);

		dispatch({ type: commentReplyTypes.GetCommentReplies, payload: response.data });
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

// GET SORTED COMMENTREPLIES BY ENTITY

const getSortedCommentRepliesByEntity = (
	singleEntityName,
	listSorting,
	singleEntityId,
	successCallback
) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getEntitiesByEntitySortedHelper(
			"CommentReplies",
			singleEntityName,
			singleEntityId,
			listSorting
		);
		console.log(response);

		dispatch({ type: commentReplyTypes.GetCommentReplies, payload: response.data });
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

// ADD COMMENTREPLY

const createCommentReply = (newCommentReply, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("CommentReplies", newCommentReply);
		console.log(response);

		dispatch({ type: commentReplyTypes.CreateCommentReply });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE COMMENTREPLY

const updateCommentReply = (commentReplyId, updatedCommentReply, successCallback) => {
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

		let response = await actionHelpers.deleteHelper("CommentReplies", commentReplyId);
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
	getSortedCommentReplies,
	getSortedCommentRepliesByEntity,
	createCommentReply,
	updateCommentReply,
	deleteCommentReply,
};
