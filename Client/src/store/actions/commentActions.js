import { commentTypes } from "../types/commentTypes";
import { commonTypes } from "../types";

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

const getComments = (commentId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Comments/";
		if (commentId) {
			url += `${commentId}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			if (commentId) {
				dispatch({ type: commentTypes.GetSingleComment, payload: data });
			} else {
				dispatch({ type: commentTypes.GetComments, payload: data });
			}
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD COMMENT

const addComment = (newComment) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Comments";

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newComment,
				}),
			});
			dispatch({ type: commentTypes.AddComment });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE COMMENT

const updateComment = (commentId, updatedComment) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Comments";

		try {
			let response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					commentId,
					...updatedComment,
				}),
			});
			await response.json();
			dispatch({ type: commentTypes.UpdateComment });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE COMMENT

const deleteComment = (commentID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Comments/${commentID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
			dispatch({ type: commentTypes.DeleteComment });
		} catch (error) {
			console.log(error);
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
