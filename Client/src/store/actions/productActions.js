import { productTypes } from "../types/productTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

// // ORDER VM

// const productCreate = {
// 	Name: "",
// 	Description: "",
// 	Price: 0,
// 	Stock: 0,
// 	CategoryId: 0,
// 	SellerId: 0,
// };

// const productUpdate = {
// 	ProductId: 0,
// 	Name: "", // OPTINAL
// 	Description: "", // OPTINAL
// 	Stock: 0, // OPTINAL
// 	CategoryId: 0, // OPTINAL
// 	SellerId: 0, // OPTINAL
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

const addProduct = (newProduct, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.addHelper("Products", newProduct);

		dispatch({ type: productTypes.AddProduct });

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
	addProduct,
	updateProduct,
	deleteProduct,
};
