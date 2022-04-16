import { productTypes } from "../types/productTypes";
import { commonTypes } from "../types";

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

const getProducts = (productID) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = "https://localhost:7000/api/Products/";

		if (productID) {
			url += `${productID}`;
		}

		try {
			let response = await fetch(url);
			let data = await response.json();
			if (productID) {
				dispatch({ type: productTypes.GetSingleProduct, payload: data });
			} else {
				dispatch({ type: productTypes.GetProducts, payload: data });
			}
		} catch (error) {
			console.log(error);
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET PRODUCTS BY CATEGORY

const getProductsByCategory = (categoryId) => {
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

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// GET PRODUCTS BY SELLER

const getProductsBySeller = (sellerId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let url = `https://localhost:7000/api/Products/BySeller/${sellerId}`;

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

		let url = "https://localhost:7000/api/Products";

		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newProduct,
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

		let url = `https://localhost:7000/api/Products`;

		try {
			await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: updatedProductId,
					...newProduct,
				}),
			});
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

		let url = `https://localhost:7000/api/Products/${productID}`;
		try {
			await fetch(url, {
				method: "DELETE",
			});
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
	getProductsBySeller,
	addProduct,
	updateProduct,
	deleteProduct,
};
