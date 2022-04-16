import { commentReplyTypes } from "../types/commentReplyTypes";
import { commonTypes } from "../types";

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

const getCommentReplies = (commentReplyId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/CommentReplies/";
		if (commentReplyId) {
			url += `${commentReplyId}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
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
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD COMMENTREPLY

const addCommentReply = (newCommentReply) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/CommentReplies";

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newCommentReply,
				}),
			});
			dispatch({ type: commentReplyTypes.AddCommentReply });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE COMMENTREPLY

const updateCommentReply = (commentReplyId, updatedCommentReply) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/CommentReplies";

		try {
			let response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					commentReplyId,
					...updatedCommentReply,
				}),
			});
			await response.json();
			dispatch({ type: commentReplyTypes.UpdateCommentReply });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE COMMENTREPLIES

const deleteCommentReply = (commentReplyID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/CommentReplies/${commentReplyID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
			dispatch({ type: commentReplyTypes.DeleteCommentReply });
		} catch (error) {
			console.log(error);
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
