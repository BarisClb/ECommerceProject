import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/layout/MainLayout";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { cartActions } from "../../store/actions/cartActions";

const Cart = () => {
	// Cart
	const cart = useSelector((state) => state.cart.currentCart);

	// Cart Functions

	const dispatch = useDispatch();

	const addOrIncreaseCartClick = (product) => {
		dispatch(cartActions.addOrIncreaseCart(product, cart));
	};

	const reduceFromCartClick = (product) => {
		dispatch(cartActions.reduceFromCart(product, cart));
	};

	const removeFromCartClick = (cartItem) => {
		dispatch(cartActions.removeFromCart(cartItem, cart));
	};

	return (
		<MainLayout>
			<Header title={"Cart"} />
			<Table
				// The Data
				apiData={cart}
				// Table Content
				// Table Headings
				tableHead={"Item"}
				tableHead2={"Quantity"}
				buttonHeadName={"Cart Actions"}
				// Table Datas
				tableData={"title"}
				tableData2={"quantity"}
				// Table Buttons
				tableButtons={true}
				tableAddButton={false}
				tableDeleteButton={false}
				tableUpdateButton={false}
				// Custom Button Add/Name
				tableCustomButton={"Add"}
				tableCustomButton2={"Decrease"}
				tableCustomButton3={"Delete"}
				// Custom Button Functions
				tableCustomButtonClick={addOrIncreaseCartClick}
				tableCustomButton2Click={reduceFromCartClick}
				tableCustomButton3Click={removeFromCartClick}
				// Custom Button Colors
				tableCustomButtonColor={"success"}
				tableCustomButtonColor2={"warning"}
				tableCustomButtonColor3={"danger"}
				// Special
				isCart={true}
			/>
		</MainLayout>
	);
};

export default Cart;