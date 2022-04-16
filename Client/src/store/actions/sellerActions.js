import { sellerTypes } from "../types/sellerTypes";
import { commonTypes } from "../types";

// // SELLER VM

// const sellerCreate = {
// 	Name: "",
// 	Username: "",
// 	EMail: "",
// 	Password: "",
// };

// const sellerUpdate = {
// 	SellerId: 0,
// 	Name: "", // OPTINAL
// 	Username: "", // OPTINAL
// 	EMail: "", // OPTINAL
// 	Password: "", // OPTINAL
// };

// GET SELLERS

const getSellers = (sellerId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Sellers/";
		if (sellerId) {
			url += `${sellerId}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			if (sellerId) {
				dispatch({ type: sellerTypes.GetSingleSeller, payload: data });
			} else {
				dispatch({ type: sellerTypes.GetSellers, payload: data });
			}
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD SELLER

const addSeller = (newSeller) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Sellers";

		try {
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newSeller,
				}),
			});
			dispatch({ type: sellerTypes.AddSeller });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE SELLER

const updateSeller = (sellerId, updatedSeller) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Sellers";

		try {
			let response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sellerId,
					...updatedSeller,
				}),
			});
			await response.json();
			dispatch({ type: sellerTypes.UpdateSeller });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE SELLER

const deleteSeller = (sellerID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Sellers/${sellerID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
			dispatch({ type: sellerTypes.DeleteSeller });
		} catch (error) {
			console.log(error);
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
