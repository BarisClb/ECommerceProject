import { likeTypes } from "../types/likeTypes";
import { commonTypes } from "../types";

// // LIKE VM

// const likeCreate = {
// 	UserId: 0,
// 	CommentId: 0,
// };

// GET LIKES

const getlikes = (likeId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Likes/";
		if (likeId) {
			url += `${likeId}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			if (likeId) {
				dispatch({ type: likeTypes.GetSinglelike, payload: data });
			} else {
				dispatch({ type: likeTypes.Getlikes, payload: data });
			}
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD LIKE

const addlike = (newlike) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Likes";

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newlike,
				}),
			});
			dispatch({ type: likeTypes.Addlike });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE LIKE

const deletelike = (likeID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Likes/${likeID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
			dispatch({ type: likeTypes.Deletelike });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const likeActions = {
	getlikes,
	addlike,
	deletelike,
};
