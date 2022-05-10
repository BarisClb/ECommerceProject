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
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'

const getProducts = (productId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getHelper("Products", productId);
		console.log(response);

		if (productId) {
			dispatch({ type: productTypes.GetSingleProduct, payload: response.data });
		} else {
			dispatch({ type: productTypes.GetProducts, payload: response.data });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET SORTED PRODUCTS

const getSortedProducts = (listSorting, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getSortedHelper("Products", listSorting);
		console.log(response);

		dispatch({ type: productTypes.GetProducts, payload: response.data });
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

// GET PRODUCTS BY CATEGORY

const getProductsByCategory = (categoryId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getByEntityHelper("Products", "Category", categoryId);
		console.log(response);

		dispatch({ type: productTypes.GetProducts, payload: response.data });

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

		let response = await actionHelpers.getByEntityHelper("Products", "Seller", sellerId);
		console.log(response);

		dispatch({ type: productTypes.GetProducts, payload: response.data });

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
		console.log(response);

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

		let response = await actionHelpers.updateHelper("Products", updatedProductId, newProduct);
		console.log(response);

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
		console.log(response);

		dispatch({ type: productTypes.DeleteProduct });

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const productActions = {
	getProducts,
	getSortedProducts,
	getProductsByCategory,
	getProductsBySeller,
	createProduct,
	updateProduct,
	deleteProduct,
};
