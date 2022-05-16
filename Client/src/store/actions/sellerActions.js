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
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'
// But still can be used for getSingleUser

const getSellers = (sellerId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getHelper("Sellers", sellerId);
		console.log(response);

		if (sellerId) {
			dispatch({ type: sellerTypes.GetSingleSeller, payload: response.data });
		} else {
			dispatch({ type: sellerTypes.GetSellers, payload: response.data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET SORTED SELLERS

const getSortedSellers = (listSorting, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getSortedHelper("Sellers", listSorting);
		console.log(response);

		dispatch({ type: sellerTypes.GetSellers, payload: response.data });
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

		let response = await actionHelpers.updateHelper("Sellers", sellerId, updatedSeller);
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
	getSortedSellers,
	createSeller,
	updateSeller,
	deleteSeller,
};
