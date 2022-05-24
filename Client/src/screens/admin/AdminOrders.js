import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { orderActions } from "../../store/actions/orderActions";
import { useSelector } from "react-redux";

function AdminOrders() {
	const dispatch = useDispatch();

	// Table Data
	const orders = useSelector((state) => state.order.orders);
	useEffect(() => {
		// Adding pageSize as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		dispatch(orderActions.getSortedOrders(sortInfo));
	}, []);

	// Nav Form Actions
	const navCreateOrderClick = async (newOrder) => {
		dispatch(orderActions.createOrder(newOrder, orderActions.getSortedOrders(sortInfo)));
	};
	const navUpdateOrderClick = (orderId, updatedOrder) => {
		dispatch(
			orderActions.updateOrder(orderId, updatedOrder, orderActions.getSortedOrders(sortInfo))
		);
	};
	const navDeleteOrderClick = (oldOrder) => {
		dispatch(orderActions.deleteOrder(oldOrder, orderActions.getSortedOrders(sortInfo)));
	};

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldOrder) => {
		dispatch(orderActions.deleteOrder(oldOrder.id, orderActions.getSortedOrders(sortInfo)));
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(orderActions.getSortedOrders(sortInfo));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: false,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

	return (
		<div id="admin-order-screen-wrapper">
			<Header title={"Orders"} />
			<div id="admin-order-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={orders}
					//// Table Content
					// Table Headings
					tableHead={"User"}
					tableHead2={"Product"}
					tableHead3={"Seller"}
					tableHead4={"Status"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"userUsername"}
					tableData2={"productName"}
					tableData3={"sellerUsername"}
					tableData4={"orderStatus"}
					// Special
					isAdmin={true}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Order"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateOrderClick}
					navUpdateButtonClick={navUpdateOrderClick}
					navDeleteButtonClick={navDeleteOrderClick}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"Product"}
					tableSortByValue2={"ProductName"}
					tableSortBy3={"Seller"}
					tableSortByValue3={"SellerUsername"}
					tableSortBy4={"User"}
					tableSortByValue4={"UserUsername"}
					tableSortBy5={"OrderStatus"}
					tableSortByValue5={"OrderStatus"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default AdminOrders;
