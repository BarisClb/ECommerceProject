import { sellerTypes } from "../types/sellerTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // SELLER VM

// const sellerCreate = {
// 	name: "",
// 	username: "",
// 	eMail: "",
// 	password: "",
// };

// const sellerUpdate = {
// 	id: 0,
// 	name: "", // OPTINAL
// 	username: "", // OPTINAL
// 	eMail: "", // OPTINAL
// 	password: "", // OPTINAL
// };

// GET SELLERS

const getSellers = (sellerId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Sellers", sellerId);

		if (sellerId) {
			dispatch({ type: sellerTypes.GetSingleSeller, payload: data });
		} else {
			dispatch({ type: sellerTypes.GetSellers, payload: data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD SELLER

const addSeller = (newSeller, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper("Sellers", newSeller);

		dispatch({ type: sellerTypes.AddSeller });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE SELLER

const updateSeller = (sellerId, updatedSeller, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.updateHelper(
			"Sellers",
			sellerId,
			updatedSeller
		);

		await response.json();

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE SELLER

const deleteSeller = (sellerId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper("Sellers", sellerId);

		dispatch({ type: sellerTypes.DeleteSeller });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const sellerActions = {
	getSellers,
	addSeller,
	updateSeller,
	deleteSeller,
};
