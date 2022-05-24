import React, { useEffect } from "react";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { orderActions } from "../../store/actions/orderActions";
import { useParams } from "react-router-dom";

function StoreProfileOrders() {
	const dispatch = useDispatch();

	// User
	const { id } = useParams();
	const user = useSelector((state) => state.account.user);

	// Table Data
	const orders = useSelector((state) => state.order.orders);
	useEffect(() => {
		// Adding pageSize and reversed as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 24 };
		}
		if (sortInfo.reversed === undefined) {
			sortInfo = { ...sortInfo, reversed: true };
		}
		dispatch(orderActions.getSortedOrdersByEntity("User", sortInfo, id));
	}, []);

	// Table Side Button Actions
	const tableCustomButtonClick = (oldOrder) => {
		dispatch(
			orderActions.updateOrder(
				oldOrder.id,
				{ orderStatus: 3 },
				orderActions.getSortedOrdersByEntity("User", sortInfo, id)
			)
		);
	};
	const tableCustomButton2Click = (oldOrder) => {
		dispatch(
			orderActions.updateOrder(
				oldOrder.id,
				{ orderStatus: 0 },
				orderActions.getSortedOrdersByEntity("User", sortInfo, id)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(orderActions.getSortedOrdersByEntity("User", sortInfo, id));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: true,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

	return (
		<div id="store-profile-orders-screen-wrapper" style={{ flexGrow: "1", marginBottom: "3rem" }}>
			<h1 style={{ textAlign: "center", margin: "3rem" }}>Orders by {user.username}</h1>
			<div id="store-profile-orders-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={orders}
					//// Table Content
					// Table Headings
					tableHead={"Order Status"}
					tableHead2={"Product"}
					tableHead3={"Quantity"}
					tableHead4={"Total Price"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"orderStatus"}
					tableData2={"productName"}
					tableData3={"quantity"}
					tableData4={"total"}
					// Special
					isAdmin={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={false}
					// // Table Custom Buttons
					tableCustomButton={"Order Received"}
					tableCustomButton2={"Cancel Order"}
					tableCustomButtonColor={"success"}
					tableCustomButtonColor2={"danger"}
					tableCustomButtonClick={tableCustomButtonClick}
					tableCustomButton2Click={tableCustomButton2Click}
					// Nav
					isNav={"Order"}
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
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Date"}
					tableSortBy2={"Product"}
					tableSortByValue2={"ProductName"}
					tableSortBy3={"OrderStatus"}
					tableSortByValue3={"OrderStatus"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default StoreProfileOrders;
