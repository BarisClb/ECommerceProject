import { cartTypes } from "../types/cartTypes";
import { commonTypes } from "../types";

// ADD OR INCREASE CART

const addOrIncreaseCart = (product, cart) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });
		let newCart = [];

		let cartItem = cart.find((item) => item.title === product.title);

		if (cartItem) {
			newCart = await cart.map((item) => {
				if (item.title === cartItem.title) {
					return Object.assign({}, cartItem, {
						quantity: cartItem.quantity + 1,
					});
				}
				return item;
			});
		} else {
			newCart = [...cart, { title: product.title, quantity: 1 }];
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
		let cartItem = cart.find((item) => item.title === product.title);

		if (cartItem.quantity > 1) {
			newCart = cart.map((item) => {
				if (item.title === cartItem.title) {
					return Object.assign({}, cartItem, {
						quantity: cartItem.quantity - 1,
					});
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

		let newCart = cart.filter((item) => item.title !== product.title);

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
