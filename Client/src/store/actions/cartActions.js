import { cartTypes } from "../types/cartTypes";
import { commonTypes } from "../types";

// ADD OR INCREASE CART

const addOrIncreaseCart = (product, cart) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let newCart = [];
		let cartItem = await cart.find((item) => item.id === product.id);

		if (cartItem) {
			newCart = await cart.map((item) => {
				if (item.id === cartItem.id) {
					return { ...item, cartQuantity: item.cartQuantity + 1 };
				}
				return item;
			});
		} else {
			newCart = [...cart, { ...product, cartQuantity: 1 }];
		}

		dispatch({ type: cartTypes.AddOrIncreaseCart, payload: newCart });

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// REDUCE FROM CART

const reduceFromCart = (product, cart) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let newCart = [];
		let cartItem = cart.find((item) => item.id === product.id);

		if (cartItem.cartQuantity > 1) {
			newCart = cart.map((item) => {
				if (item.id === cartItem.id) {
					return { ...item, cartQuantity: item.cartQuantity - 1 };
				}
				return item;
			});
		} else {
			newCart = cart;
		}

		dispatch({ type: cartTypes.ReduceFromCart, payload: newCart });

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// REMOVE FROM CART

const removeFromCart = (product, cart) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let newCart = cart.filter((item) => item.id !== product.id);

		dispatch({ type: cartTypes.RemoveFromCart, payload: newCart });

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

// CLEAR CART

const clearCart = () => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		let newCart = [];

		dispatch({ type: cartTypes.ClearCart, payload: newCart });
		dispatch({ type: commonTypes.AsyncEnd });
	};
};

export const cartActions = {
	addOrIncreaseCart,
	reduceFromCart,
	removeFromCart,
	clearCart,
};
