import { userTypes } from "../types/userTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // USER VM

// const userCreate = {
// 	name: "",
// 	username: "",
// 	eMail: "",
// 	password: "",
// 	admin: "", // ADMIN PASSWORD CHECK
// };

// const userUpdate = {
// 	id: 0,
// 	name: "", // OPTINAL
// 	username: "", // OPTINAL
// 	eMail: "", // OPTINAL
// 	password: "", // OPTINAL
// 	admin: "", // ADMIN PASSWORD CHECK
// };

// GET USERS

const getUsers = (userId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Users", userId);

		if (userId) {
			dispatch({ type: userTypes.GetSingleUser, payload: data });
		} else {
			dispatch({ type: userTypes.GetUsers, payload: data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD USER

const addUser = (newUser, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper("Users", newUser);

		dispatch({ type: userTypes.AddUser });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE USER

const updateUser = (userId, updatedUser, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.updateHelper(
			"Users",
			userId,
			updatedUser
		);

		dispatch({ type: userTypes.UpdateUser });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE USER

const deleteUser = (userId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper("Users", userId);

		dispatch({ type: userTypes.DeleteUser });

		if (successCallback) {
			dispatch(successCallback);
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
