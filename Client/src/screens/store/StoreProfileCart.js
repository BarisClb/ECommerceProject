import React from "react";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cartActions } from "../../store/actions/cartActions";
import { orderActions } from "../../store/actions/orderActions";
import { useParams } from "react-router-dom";

function StoreProfileCart() {
	const dispatch = useDispatch();

	// User
	const { id } = useParams();
	const user = useSelector((state) => state.account.user);

	// Table Data
	const cartItems = useSelector((state) => state.cart.currentCart);

	// Table Side Button Actions
	const tableDeleteButtonClick = (item) => {
		dispatch(cartActions.removeFromCart(item, cartItems));
	};

	const tableCustomButtonClick = (item) => {
		dispatch(cartActions.addOrIncreaseCart(item, cartItems));
	};
	const tableCustomButton2Click = (item) => {
		dispatch(cartActions.reduceFromCart(item, cartItems));
	};
	const tableCustomButton3Click = (item) => {
		dispatch(
			orderActions.createOrder(
				{
					price: item.price,
					quantity: item.cartQuantity,
					discount: 0,
					userId: user.id,
					productId: item.id,
				},
				cartActions.removeFromCart(item, cartItems)
			)
		);
	};

	return (
		<div id="store-profile-carts-screen-wrapper" style={{ flexGrow: "1", marginBottom: "3rem" }}>
			<h1 style={{ textAlign: "center", margin: "3rem" }}>Items from {user.username}'s Cart</h1>
			<div id="store-profile-carts-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={cartItems}
					//// Table Content
					// Table Headings
					tableHead={"Name"}
					tableHead2={"Description"}
					tableHead3={"Price"}
					tableHead4={"Quantity"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"description"}
					tableData3={"price"}
					tableData4={"cartQuantity"}
					// Special
					isAdmin={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Custom Buttons
					tableCustomButton={"+1"}
					tableCustomButton2={"-1"}
					tableCustomButton3={"Order"}
					tableCustomButtonColor={"success"}
					tableCustomButtonColor2={"warning"}
					tableCustomButtonColor3={"primary"}
					tableCustomButtonClick={tableCustomButtonClick}
					tableCustomButton2Click={tableCustomButton2Click}
					tableCustomButton3Click={tableCustomButton3Click}
					// // Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Cart Items"}
					navCreateButton={false}
					navUpdateButton={false}
					navDeleteButton={false}
					// Nav Actions
					navCreateButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={false}
					tableSortBy={false}
					tableSortBy1={"Date"}
					tableSortBy2={"Rating"}
					tableSortByValue2={"Rating"}
					tableSortBy3={"Product"}
					tableSortByValue3={"ProductName"}
					tableSortAction={false}
				/>
			</div>
		</div>
	);
}

export default StoreProfileCart;
