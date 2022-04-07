import { productTypes } from "../types/productTypes";

export default function productReducer(state = { products: [] }, action) {
	switch (action.type) {
		case productTypes.GetProducts:
			return { ...state, products: action.payload };

		case productTypes.AddProduct:
			return { ...state, products: action.payload };

		case productTypes.UpdateProduct:
			return { ...state, products: action.payload };

		case productTypes.DeleteProduct:
			return { ...state, products: action.payload };

		default:
			return state;
	}
}
