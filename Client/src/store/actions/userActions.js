import { userTypes } from "../types/userTypes";
import { commonTypes } from "../types";

// // USER VM

// const userCreate = {
// 	Name: "",
// 	Username: "",
// 	EMail: "",
// 	Password: "",
// 	Admin: "", // ADMIN PASSWORD CHECK
// };

// const userUpdate = {
// 	UserId: 0,
// 	Name: "", // OPTINAL
// 	Username: "", // OPTINAL
// 	EMail: "", // OPTINAL
// 	Password: "", // OPTINAL
// 	Admin: "", // ADMIN PASSWORD CHECK
// };

// GET USERS

const getUsers = (userId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Users/";
		if (userId) {
			url += `${userId}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			if (userId) {
				dispatch({ type: userTypes.GetSingleUser, payload: data });
			} else {
				dispatch({ type: userTypes.GetUsers, payload: data });
			}
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD USER

const addUser = (newUser) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Users";

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newUser,
				}),
			});
			dispatch({ type: userTypes.AddUser });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE USER

const updateUser = (userId, updatedUser) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Users";

		try {
			let response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					...updatedUser,
				}),
			});
			await response.json();
			dispatch({ type: userTypes.UpdateUser });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE USER

const deleteUser = (userID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Users/${userID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
			dispatch({ type: userTypes.DeleteUser });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const userActions = {
	getUsers,
	addUser,
	updateUser,
	deleteUser,
};
