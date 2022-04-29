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
		console.log(data);

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

const createSeller = (newSeller, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Sellers", newSeller);
		console.log(response);

		dispatch({ type: sellerTypes.CreateSeller });

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
		console.log(response);

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
		console.log(response);

		dispatch({ type: sellerTypes.DeleteSeller });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const sellerActions = {
	getSellers,
	createSeller,
	updateSeller,
	deleteSeller,
};
