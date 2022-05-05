import { commonTypes } from "../types";
import { accountTypes } from "../types/accountTypes";

// ACCOUNT LOGIN

const accountLogIn = (accountType, accountInfo) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Account/${accountType}/`;

		try {
			let response = await fetch(url, {
				method: "POST",
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

		let url = `https://localhost:7000/api/Account/Verify?accountType=${accountType}/`;

		try {
			let response = fetch(url);
			let responseJson = response.json();
			console.log(responseJson);

			if (accountType === "User") {
				dispatch({ type: accountTypes.UserVerify, payload: responseJson.data });
			} else if (accountType === "Seller") {
				dispatch({ type: accountTypes.SellerVerify, payload: responseJson.data });
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

		let url = `https://localhost:7000/api/Account/LogOut?accountType=${accountType}/`;

		try {
			let response = await fetch(url, {
				method: "POST",
			});
			let responseJson = response.json();
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
