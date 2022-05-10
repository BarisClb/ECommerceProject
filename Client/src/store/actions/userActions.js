import { userTypes } from "../types/userTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // USER VM

// const userCreate = {
// 	name: "",
// 	username: "",
// 	eMail: "",
// 	password: "",
//		admin: false, // DIRECT ADMIN ACCESS FOR ADMINS // OPTINAL
// 	adminPassword: "", // ADMIN PASSWORD CHECK // OPTINAL
// };

// const userUpdate = {
// 	id: 0,
// 	name: "", // OPTINAL
// 	username: "", // OPTINAL
// 	eMail: "", // OPTINAL
// 	password: "", // OPTINAL
//		admin: false, // OPTINAL -> DIRECT ACCESS FOR ADMINS -> NORMAL USER SHOULD 'TRY' adminPassword
// 	adminPassword: "", // ADMIN PASSWORD CHECK // OPTINAL
// };

// GET USERS
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'

const getUsers = (userId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getHelper("Users", userId);
		console.log(response);

		if (userId) {
			dispatch({ type: userTypes.GetSingleUser, payload: response.data });
		} else {
			dispatch({ type: userTypes.GetUsers, payload: response.data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET SORTED USERS

const getSortedUsers = (listSorting, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getSortedHelper("Users", listSorting);
		console.log(response);

		dispatch({ type: userTypes.GetUsers, payload: response.data });
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

// ADD USER

const createUser = (newUser, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Users", newUser);
		console.log(response);

		dispatch({ type: userTypes.CreateUser });

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

		let response = await actionHelpers.updateHelper("Users", userId, updatedUser);
		console.log(response);

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
		console.log(response);

		dispatch({ type: userTypes.DeleteUser });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const userActions = {
	getUsers,
	getSortedUsers,
	createUser,
	updateUser,
	deleteUser,
};
