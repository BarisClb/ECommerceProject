import { productTypes } from "../types/productTypes";
import { commonTypes } from "../types";

// GET PRODUCTS

const getProducts = (productID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Products/";

		if (productID) {
			url += `getProductById?productId=${productID}`;
		} else {
			url += `all`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			dispatch({ type: productTypes.GetProducts, payload: data });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET PRODUCTS

const getProductsByCategory = (categoryName) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Products/getProductsByCategory?categoryName=${categoryName}`;

		try {
			let response = await fetch(url);
			let data = await response.json();
			dispatch({ type: productTypes.GetProducts, payload: data });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// ADD PRODUCT

const addProduct = (newProduct) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Products/addProduct";

		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: newProduct.name,
					category: newProduct.category,
					unitPrice: newProduct.price,
					unitsInStock: newProduct.stock,
				}),
			});
			console.log(response);
			dispatch({ type: productTypes.AddProduct });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// UPDATE PRODUCT

const updateProduct = (updatedProductId, newProduct) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Products/updateProduct`;

		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: updatedProductId,
					name: newProduct.name,
					category: newProduct.category,
					unitPrice: newProduct.unitPrice,
					unitsInStock: newProduct.unitsInStock,
				}),
			});
			let data = await response.json();
			console.log(data);
			dispatch({ type: productTypes.UpdateProduct });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// DELETE PRODUCT

const deleteProduct = (productID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Products/deleteProduct?productId=${productID}`;
		try {
			let response = await fetch(url, {
				method: "POST",
			});
			console.log(response);
			dispatch({ type: productTypes.DeleteProduct });
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const productActions = {
	getProducts,
	getProductsByCategory,
	addProduct,
	updateProduct,
	deleteProduct,
};
