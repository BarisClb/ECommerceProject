import { productTypes } from "../types/productTypes";
import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";
import { toast } from "react-toastify";

const database = process.env.REACT_APP_DATABASE;
const aspNetKestrelUrl = process.env.REACT_APP_ASPNET_KESTREL_URL;
const aspNetIisUrl = process.env.REACT_APP_ASPNET_IIS_URL;

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
// But still can be used for getSingleUser

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

// GET PRODUCT PAGE

const getProductPage = (productId, successCallback) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "";
		switch (database) {
			case "Local_Kestrel":
				url = `${aspNetKestrelUrl}/Products/ProductPage?id=${productId}`;
				break;
			case "Local_IIS":
				url = `${aspNetIisUrl}/Products/ProductPage?id=${productId}`;
				break;

			default:
				break;
		}

		try {
			let response = await fetch(url);
			let responseJson = await response.json();
			console.log(responseJson);

			if (responseJson.success) {
				dispatch({ type: productTypes.GetSingleProduct, payload: responseJson.data });
			} else {
				toast.warning(responseJson.message);
				dispatch({ type: productTypes.GetSingleProduct, payload: {} });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: productTypes.GetSingleProduct, payload: {} });
		}

		if (successCallback) {
			dispatch(successCallback);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET PRODUCTS BY ENTITY

const getProductsByEntity = (singleEntityName, categoryId, successCallback) => {
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

// GET SORTED PRODUCTS BY ENTITY

const getSortedProductsByEntity = (
	singleEntityName,
	listSorting,
	singleEntityId,
	successCallback
) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let response = await actionHelpers.getEntitiesByEntitySortedHelper(
			"Products",
			singleEntityName,
			singleEntityId,
			listSorting
		);
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
	getProductPage,
	getProductsByEntity,
	getSortedProductsByEntity,
	createProduct,
	updateProduct,
	deleteProduct,
};
