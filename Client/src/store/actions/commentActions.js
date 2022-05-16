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
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'
// But still can be used for getSingleUser

const getComments = (commentId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getHelper("Comments", commentId);
		console.log(response);

		if (commentId) {
			dispatch({ type: commentTypes.GetSingleComment, payload: response.data });
		} else {
			dispatch({ type: commentTypes.GetComments, payload: response.data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET SORTED COMMENTS

const getSortedComments = (listSorting, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getSortedHelper("Comments", listSorting);
		console.log(response);

		dispatch({ type: commentTypes.GetComments, payload: response.data });
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

// GET SORTED COMMENTS BY ENTITY

const getSortedCommentsByEntity = (
	singleEntityName,
	listSorting,
	singleEntityId,
	successCallback
) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getEntitiesByEntitySortedHelper(
			"Comments",
			singleEntityName,
			singleEntityId,
			listSorting
		);
		console.log(response);

		dispatch({ type: commentTypes.GetComments, payload: response.data });
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

// ADD COMMENT

const createComment = (newComment, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Comments", newComment);
		console.log(response);

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

		let response = await actionHelpers.updateHelper("Comments", commentId, updatedComment);
		console.log(response);

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
		console.log(response);

		dispatch({ type: commentTypes.DeleteComment });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const commentActions = {
	getComments,
	getSortedComments,
	getSortedCommentsByEntity,
	createComment,
	updateComment,
	deleteComment,
};
