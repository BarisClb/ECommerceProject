import { commonTypes } from "../types";
import { accountTypes } from "../types/accountTypes";
const database = process.env.REACT_APP_DATABASE;
const apiUrl = process.env.REACT_APP_LOCAL_API_URL;

// credentials : "include" -> for cookies

// ACCOUNT LOGIN

const accountLogIn = (accountType, accountInfo) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		// Added env variables here to easily change API
		let url = "";
		switch (database) {
			case "Local":
				url = `${apiUrl}/Account/LogIn/`;
				break;

			default:
				break;
		}

		try {
			let response = await fetch(url, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...accountInfo,
				}),
			});
			let responseJson = await response.json();
			console.log(responseJson);

			if (responseJson.success) {
				if (accountType === "User") {
					dispatch({ type: accountTypes.UserLogIn, payload: responseJson.data });
				} else if (accountType === "Seller") {
					dispatch({ type: accountTypes.SellerLogIn, payload: responseJson.data });
				}
			} else {
				window.alert(responseJson.message);
				if (accountType === "User") {
					dispatch({ type: accountTypes.UserLogIn, payload: {} });
				} else if (accountType === "Seller") {
					dispatch({ type: accountTypes.SellerLogIn, payload: {} });
				}
			}
		} catch (error) {
			console.log(error);
			if (accountType === "User") {
				dispatch({ type: accountTypes.UserLogIn, payload: {} });
			} else if (accountType === "Seller") {
				dispatch({ type: accountTypes.SellerLogIn, payload: {} });
			}
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ACCOUNT VERIFY

const accountVerify = (accountType) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		// Added env variables here to easily change API
		let url = "";
		switch (database) {
			case "Local":
				url = `${apiUrl}/Account/Verify?accountType=${accountType}`;
				break;

			default:
				break;
		}

		try {
			let response = await fetch(url, {
				credentials: "include",
			});
			let responseJson = await response.json();
			console.log(responseJson);

			if (responseJson.success) {
				if (accountType === "User") {
					dispatch({ type: accountTypes.UserVerify, payload: responseJson.data });
				} else if (accountType === "Seller") {
					dispatch({ type: accountTypes.SellerVerify, payload: responseJson.data });
				}
			} else {
				window.alert(responseJson.message);
				if (accountType === "User") {
					dispatch({ type: accountTypes.UserLogIn, payload: {} });
				} else if (accountType === "Seller") {
					dispatch({ type: accountTypes.SellerLogIn, payload: {} });
				}
			}
		} catch (error) {
			console.log(error);
			if (accountType === "User") {
				dispatch({ type: accountTypes.UserVerify, payload: {} });
			} else if (accountType === "Seller") {
				dispatch({ type: accountTypes.SellerVerify, payload: {} });
			}
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ACCOUNT LOGOUT

const accountLogOut = (accountType) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		// // Direct approach
		// document.cookie = "username=; expires=Thu, 22 May 1995 00:15:00 UTC; path=/;";

		// Added env variables here to easily change API
		let url = "";
		switch (database) {
			case "Local":
				url = `${apiUrl}/Account/LogOut?accountType=${accountType}`;
				break;

			default:
				break;
		}

		try {
			let response = await fetch(url, {
				method: "POST",
				credentials: "include",
			});
			let responseJson = await response.json();
			console.log(responseJson);

			if (accountType === "User") {
				dispatch({ type: accountTypes.UserLogOut, payload: {} });
			} else if (accountType === "Seller") {
				dispatch({ type: accountTypes.SellerLogOut, payload: {} });
			}
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const accountActions = {
	accountLogIn,
	accountVerify,
	accountLogOut,
};
