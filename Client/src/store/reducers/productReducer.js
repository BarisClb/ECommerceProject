import { productTypes } from "../types/productTypes";

export default function productReducer(
	state = { products: [], singleProduct: {} },
	action
) {
	switch (action.type) {
		case productTypes.GetProducts:
			return { ...state, products: action.payload };

		case productTypes.GetSingleProduct:
			return { ...state, singleProduct: action.payload };

		case productTypes.AddProduct:
			return state;

		case productTypes.UpdateProduct:
			return state;

		case productTypes.DeleteProduct:
			return state;

		default:
			return state;
	}
}
