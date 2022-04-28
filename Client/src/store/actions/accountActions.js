import { commonTypes } from "../types";
import { accountTypes } from "../types/accountTypes";

const logIn = () => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		// LOGIN ACTIONS

		dispatch({ type: accountTypes.LogIn });

		dispatch({ type: commonTypes.AsyncEnd });
	};
};
const logOut = () => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		// LOGOUT ACTIONS

		dispatch({ type: accountTypes.LogOut });

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const accountActions = {
	logIn,
	logOut,
};
