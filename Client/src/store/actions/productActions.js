import { productTypes } from "../types/productTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // ORDER VM

// const productCreate = {
// 	name: "",
// 	description: "",
// 	price: 0,
// 	stock: 0,
// 	categoryId: 0,
// 	sellerId: 0,
// };

// const productUpdate = {
// 	id: 0,
// 	name: "", // OPTINAL
// 	description: "", // OPTINAL
// 	stock: 0, // OPTINAL
// 	categoryId: 0, // OPTINAL
// 	sellerId: 0, // OPTINAL
// };

// GET PRODUCTS

const getProducts = (productId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getHelper("Products", productId);

		if (productId) {
			dispatch({ type: productTypes.GetSingleProduct, payload: data });
		} else {
			dispatch({ type: productTypes.GetProducts, payload: data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET PRODUCTS BY CATEGORY

const getProductsByCategory = (categoryId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Products/ByCategory/${categoryId}`;

		try {
			let response = await fetch(url);
			let data = await response.json();
			dispatch({ type: productTypes.GetProducts, payload: data });
		} catch (error) {
			console.log(error);
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET PRODUCTS BY SELLER

const getProductsBySeller = (sellerId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let data = await actionHelpers.getByEntityHelper(
			"Products",
			"Seller",
			sellerId
		);

		dispatch({ type: productTypes.GetProducts, payload: data });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD PRODUCT

const createProduct = (newProduct, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.createHelper("Products", newProduct);

		dispatch({ type: productTypes.CreateProduct });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE PRODUCT

const updateProduct = (updatedProductId, newProduct, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.updateHelper(
			"Products",
			updatedProductId,
			newProduct
		);

		dispatch({ type: productTypes.UpdateProduct });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE PRODUCT

const deleteProduct = (productId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.deleteHelper("Products", productId);

		dispatch({ type: productTypes.DeleteProduct });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const productActions = {
	getProducts,
	getProductsByCategory,
	getProductsBySeller,
	createProduct,
	updateProduct,
	deleteProduct,
};
